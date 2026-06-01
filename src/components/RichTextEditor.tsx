"use client";

import React, { forwardRef, useImperativeHandle } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';
import { Bold, Italic, Strikethrough, Link as LinkIcon, Heading1, Heading2, Quote, Code, Sparkles, MessageSquarePlus, PenTool } from 'lucide-react';
import { CommentMark, SuggestionMark } from './editor/extensions';

export interface RichTextEditorRef {
  applySuggestion: (commentId: string, newText: string) => void;
  resolveSuggestion: (commentId: string, accept: boolean) => void;
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
    CommentMark,
    SuggestionMark,
  ], []);

  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base dark:prose-invert prose-p:leading-relaxed prose-headings:font-medium focus:outline-none min-h-[300px] max-w-none px-4 py-4',
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
        editor.chain()
          .setTextSelection({ from, to })
          .setSuggestion(commentId, 'deletion')
          .insertContentAt(to, textToInsert)
          .setTextSelection({ from: to, to: to + textToInsert.length })
          .setSuggestion(commentId, 'addition')
          .setComment(commentId)
          .run();
      }
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
