"use client";

import React, { forwardRef, useImperativeHandle } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { marked } from 'marked';
import { Bold, Italic, Strikethrough, Link as LinkIcon, Heading1, Heading2, Quote, Code, Sparkles, MessageSquarePlus, PenTool } from 'lucide-react';
import { CommentMark, SuggestionMark } from './editor/extensions';

export interface RichTextEditorRef {
  applySuggestion: (commentId: string, newText: string) => void;
  resolveSuggestion: (commentId: string, accept: boolean) => void;
  appendAsTasks: (text: string) => void;
}

interface RichTextEditorProps {
  content: string;
  onChange: (markdown: string) => void;
  onAskAI?: (text: string, commentId: string, skill?: string) => void;
  onActiveThreadChange?: (id: string | null) => void;
  activeThreadId?: string | null;
}

const RichTextEditor = forwardRef<RichTextEditorRef, RichTextEditorProps>(({ content, onChange, onAskAI, onActiveThreadChange, activeThreadId }, ref) => {
  const extensions = React.useMemo(() => [
    StarterKit,
    Markdown.configure({
      linkify: true,
    }),
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    CommentMark,
    SuggestionMark,
  ], []);

  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert focus:outline-none min-h-[300px] max-w-none px-4 py-4 ' +
               'prose-p:text-[18px] sm:prose-p:text-[20px] prose-p:text-[#222222] dark:prose-p:text-foreground/90 prose-p:leading-[1.6] prose-p:mb-8 ' +
               'prose-headings:tracking-tight prose-headings:text-[#222222] dark:prose-headings:text-foreground prose-headings:font-bold ' +
               'prose-h1:text-3xl sm:prose-h1:text-4xl prose-h1:mt-10 prose-h1:mb-6 ' +
               'prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 ' +
               'prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 ' +
               'prose-a:text-accent hover:prose-a:text-accent-hover prose-a:transition-colors ' +
               'prose-strong:text-accent prose-strong:font-bold ' +
               'prose-ul:text-[18px] sm:prose-ul:text-[20px] prose-ul:text-[#222222] dark:prose-ul:text-foreground/90 prose-ul:leading-[1.6] prose-ul:mb-8 prose-ul:space-y-3 ' +
               'prose-ol:text-[18px] sm:prose-ol:text-[20px] prose-ol:text-[#222222] dark:prose-ol:text-foreground/90 prose-ol:leading-[1.6] prose-ol:mb-8 prose-ol:space-y-3 ' +
               'prose-blockquote:border-l-4 prose-blockquote:border-muted prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:italic prose-blockquote:my-8 prose-blockquote:text-muted-foreground prose-blockquote:bg-muted/20 prose-blockquote:rounded-r-lg',
      },
    },
    onUpdate: ({ editor }) => {
      const markdown = (editor.storage as any).markdown.getMarkdown();
      onChange(markdown);
    },
    onSelectionUpdate: ({ editor }) => {
      if (!onActiveThreadChange) return;
      
      const { $from } = editor.state.selection;
      const marks = $from.marks();
      const commentMark = marks.find(m => m.type.name === 'comment');
      
      if (commentMark) {
        onActiveThreadChange(commentMark.attrs.id);
      } else {
        onActiveThreadChange(null);
      }
    },
  });

  React.useEffect(() => {
    if (editor && content !== undefined) {
      const currentContent = (editor.storage as any).markdown.getMarkdown();
      if (currentContent !== content) {
        editor.commands.setContent(content);
      }
    }
  }, [editor, content]);

  useImperativeHandle(ref, () => ({
    applySuggestion: (commentId: string, newText: string) => {
      if (!editor) return;
      
      const state = editor.state;
      let from = -1;
      let to = -1;
      
      state.doc.descendants((node, pos) => {
        const hasComment = node.marks.find(m => m.type.name === 'comment' && m.attrs.id === commentId);
        if (hasComment) {
          if (from === -1) from = pos;
          to = pos + node.nodeSize;
        }
      });
      
      if (from !== -1 && to !== -1) {
        const textToInsert = newText || "";
        
        // Convert Markdown to HTML to preserve formatting
        const htmlContent = marked.parse(textToInsert) as string;
        
        // First set selection to the original text and mark it as a deletion (red, strikethrough)
        editor.chain()
          .setTextSelection({ from, to })
          .setSuggestion(commentId, 'deletion')
          .run();
          
        // Then insert the new text right after it, marked as an addition (green)
        editor.chain()
          .insertContentAt(to, htmlContent, {
            updateSelection: true,
          })
          // The newly inserted content might be multiple nodes, so we select what was just inserted
          .command(({ tr, commands }) => {
            const addedFrom = to;
            const addedTo = tr.selection.to;
            return commands.setTextSelection({ from: addedFrom, to: addedTo });
          })
          .setSuggestion(commentId, 'addition')
          .setComment(commentId)
          .setTextSelection(to) // reset cursor
          .run();
      }
    },
    appendAsTasks: (text: string) => {
      if (!editor) return;
      
      // We convert text like "- [ ] Question" into Tiptap's TaskList format.
      // Tiptap can parse standard markdown lists if we pass them as HTML using marked, 
      // but Github Flavored Markdown (which marked uses for checkboxes) isn't natively converted to Tiptap TaskList easily via raw HTML insertion.
      // However, tiptap-markdown handles markdown checkboxes correctly via paste/input.
      // Another way is to format it as a markdown string and let tiptap-markdown or `insertContent` handle it.
      
      const htmlContent = marked.parse(text, { gfm: true }) as string;
      
      // We insert at the very end of the document
      const endPos = editor.state.doc.content.size;
      
      editor.chain()
        .focus()
        .insertContentAt(endPos, `\n\n<div class="mt-8 pt-4 border-t border-border/50"><h3>AI Обратная связь:</h3>${htmlContent}</div>`)
        .run();
    },
    resolveSuggestion: (commentId: string, accept: boolean) => {
      if (!editor) return;
      
      const state = editor.state;
      let delFrom = -1, delTo = -1;
      let addFrom = -1, addTo = -1;
      
      state.doc.descendants((node, pos) => {
        const sugMark = node.marks.find(m => m.type.name === 'suggestion' && m.attrs.id === commentId);
        if (sugMark) {
          if (sugMark.attrs.type === 'deletion') {
            if (delFrom === -1) delFrom = pos;
            delTo = pos + node.nodeSize;
          } else if (sugMark.attrs.type === 'addition') {
            if (addFrom === -1) addFrom = pos;
            addTo = pos + node.nodeSize;
          }
        }
      });
      
      editor.chain().focus().run();
      
      if (accept) {
        if (delFrom !== -1 && delTo !== -1) {
          editor.chain().deleteRange({ from: delFrom, to: delTo }).run();
          const offset = delTo - delFrom;
          if (addFrom !== -1) addFrom -= offset;
          if (addTo !== -1) addTo -= offset;
        }
        if (addFrom !== -1 && addTo !== -1) {
          editor.chain()
            .setTextSelection({ from: addFrom, to: addTo })
            .unsetSuggestion(commentId)
            .unsetComment(commentId)
            .run();
        }
      } else {
        if (addFrom !== -1 && addTo !== -1) {
          editor.chain().deleteRange({ from: addFrom, to: addTo }).run();
        }
        if (delFrom !== -1 && delTo !== -1) {
          editor.chain()
            .setTextSelection({ from: delFrom, to: delTo })
            .unsetSuggestion(commentId)
            .unsetComment(commentId)
            .run();
        }
      }
    }
  }), [editor]);

  if (!editor) {
    return null;
  }

  const toggleLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL:', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const handleAIAction = (skill: string) => {
    const selection = editor.state.selection;
    const text = editor.state.doc.textBetween(selection.from, selection.to, ' ');
    if (text && typeof onAskAI === 'function') {
      const commentId = Math.random().toString(36).substring(2, 10);
      editor.chain().focus().setComment(commentId).setTextSelection(selection.to).run();
      onAskAI(text, commentId, skill);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col group/editor">
      <style>{`
        .tiptap span[data-comment-id] {
          background-color: transparent !important;
          border-bottom: 2px solid rgba(150, 150, 150, 0.4) !important;
          transition: all 0.2s ease;
        }
        ${activeThreadId ? `
        .tiptap span[data-comment-id="${activeThreadId}"] {
          background-color: rgba(255, 255, 255, 0.15) !important;
          border-bottom: 2px solid rgba(255, 255, 255, 0.8) !important;
        }
        ` : ''}
      `}</style>
      {editor && (
        <BubbleMenu 
          editor={editor} 
          className="flex items-center gap-1 bg-card border border-border shadow-xl rounded-xl p-1.5 backdrop-blur-md"
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded-md hover:bg-accent/10 transition-colors ${editor.isActive('bold') ? 'bg-accent/20 text-accent' : 'text-muted hover:text-foreground'}`}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded-md hover:bg-accent/10 transition-colors ${editor.isActive('italic') ? 'bg-accent/20 text-accent' : 'text-muted hover:text-foreground'}`}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          
          <div className="w-px h-4 bg-border mx-1" />
          
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-1.5 rounded-md hover:bg-accent/10 transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-accent/20 text-accent' : 'text-muted hover:text-foreground'}`}
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-1.5 rounded-md hover:bg-accent/10 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-accent/20 text-accent' : 'text-muted hover:text-foreground'}`}
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-1.5 rounded-md hover:bg-accent/10 transition-colors ${editor.isActive('blockquote') ? 'bg-accent/20 text-accent' : 'text-muted hover:text-foreground'}`}
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </button>
          
          <div className="w-px h-4 bg-border mx-1" />
          
          <button
            onClick={toggleLink}
            className={`p-1.5 rounded-md hover:bg-accent/10 transition-colors ${editor.isActive('link') ? 'bg-accent/20 text-accent' : 'text-muted hover:text-foreground'}`}
            title="Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          
          {onAskAI && (
            <>
              <div className="w-px h-4 bg-border mx-1" />
              <button
                onClick={() => handleAIAction('grill-me')}
                className="p-1.5 rounded-md hover:bg-accent/10 transition-colors text-orange-500 hover:text-orange-400 flex items-center gap-1.5"
                title="Grill Mode (Critique)"
              >
                <MessageSquarePlus className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleAIAction('humanizer')}
                className="p-1.5 rounded-md hover:bg-accent/10 transition-colors text-blue-500 hover:text-blue-400 flex items-center gap-1.5"
                title="Humanizer"
              >
                <Sparkles className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleAIAction('writer')}
                className="p-1.5 rounded-md hover:bg-accent/10 transition-colors text-green-500 hover:text-green-400 flex items-center gap-1.5"
                title="Writer (Rewrite)"
              >
                <PenTool className="w-4 h-4" />
              </button>
            </>
          )}
        </BubbleMenu>
      )}
      
      <div className="flex-1 overflow-y-auto min-h-[300px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
});

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;
