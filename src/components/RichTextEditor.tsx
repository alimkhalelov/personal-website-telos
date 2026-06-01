"use client";

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';
import Link from '@tiptap/extension-link';
import { Bold, Italic, Strikethrough, Link as LinkIcon, Heading1, Heading2, Quote, Code, Sparkles } from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (markdown: string) => void;
  onAskAI?: (text: string) => void;
}

export default function RichTextEditor({ content, onChange, onAskAI }: RichTextEditorProps) {
  const extensions = React.useMemo(() => [
    StarterKit,
    Markdown,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: 'text-accent underline underline-offset-4 cursor-pointer',
      },
    }),
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
      // Get the markdown output using the extension
      const markdown = (editor.storage as any).markdown.getMarkdown();
      onChange(markdown);
    },
  });

  if (!editor) {
    return null;
  }

  const toggleLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL:', previousUrl);
    
    if (url === null) {
      return; // cancelled
    }
    
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="relative w-full h-full flex flex-col group/editor">
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
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-1.5 rounded-md hover:bg-accent/10 transition-colors ${editor.isActive('strike') ? 'bg-accent/20 text-accent' : 'text-muted hover:text-foreground'}`}
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
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
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-1.5 rounded-md hover:bg-accent/10 transition-colors ${editor.isActive('code') ? 'bg-accent/20 text-accent' : 'text-muted hover:text-foreground'}`}
            title="Code"
          >
            <Code className="w-4 h-4" />
          </button>
          
          {onAskAI && (
            <>
              <div className="w-px h-4 bg-border mx-1" />
              <button
                onClick={() => {
                  const selection = editor.state.selection;
                  const text = editor.state.doc.textBetween(selection.from, selection.to, ' ');
                  if (text && typeof onAskAI === 'function') {
                    onAskAI(text);
                  }
                }}
                className="p-1.5 rounded-md hover:bg-accent/10 transition-colors text-accent hover:text-accent-hover flex items-center gap-1.5"
                title="Ask AI (Grill Mode)"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-medium pr-1">Ask AI</span>
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
}
