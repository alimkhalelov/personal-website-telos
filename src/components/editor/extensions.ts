import { Mark, mergeAttributes } from '@tiptap/core';

export interface CommentMarkOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    comment: {
      /**
       * Set a comment mark
       */
      setComment: (id: string) => ReturnType;
      /**
       * Unset a comment mark
       */
      unsetComment: (id: string) => ReturnType;
    };
    suggestion: {
      setSuggestion: (id: string, type: 'addition' | 'deletion') => ReturnType;
      unsetSuggestion: (id: string) => ReturnType;
    }
  }
}

export const CommentMark = Mark.create<CommentMarkOptions>({
  name: 'comment',

  addOptions() {
    return {
      HTMLAttributes: {
        class: 'bg-accent/30 border-b-2 border-accent/50 cursor-pointer transition-colors hover:bg-accent/40',
      },
    };
  },

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: element => element.getAttribute('data-comment-id'),
        renderHTML: attributes => {
          if (!attributes.id) {
            return {};
          }
          return {
            'data-comment-id': attributes.id,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-comment-id]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setComment:
        (id: string) =>
        ({ commands }) => {
          return commands.setMark(this.name, { id });
        },
      unsetComment:
        (id: string) =>
        ({ tr, dispatch }) => {
          if (dispatch) {
            tr.doc.descendants((node, pos) => {
              const marks = node.marks.filter(
                mark => mark.type.name === this.name && mark.attrs.id === id
              );
              marks.forEach(mark => {
                tr.removeMark(pos, pos + node.nodeSize, mark);
              });
            });
          }
          return true;
        },
    };
  },
});

export const SuggestionMark = Mark.create({
  name: 'suggestion',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: element => element.getAttribute('data-suggestion-id'),
        renderHTML: attributes => {
          if (!attributes.id) {
            return {};
          }
          return { 'data-suggestion-id': attributes.id };
        },
      },
      type: {
        default: 'addition', // 'addition' | 'deletion'
        parseHTML: element => element.getAttribute('data-suggestion-type'),
        renderHTML: attributes => {
          const baseAttr = { 'data-suggestion-type': attributes.type };
          if (attributes.type === 'addition') {
            return {
              ...baseAttr,
              class: 'bg-green-500/20 text-green-800 dark:text-green-200 border-b-2 border-green-500/50',
            };
          }
          if (attributes.type === 'deletion') {
            return {
              ...baseAttr,
              class: 'bg-red-500/20 text-red-800 dark:text-red-200 line-through decoration-red-500/50',
            };
          }
          return baseAttr;
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-suggestion-id]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setSuggestion:
        (id: string, type: 'addition' | 'deletion') =>
        ({ commands }) => {
          return commands.setMark(this.name, { id, type });
        },
      unsetSuggestion:
        (id: string) =>
        ({ tr, dispatch }) => {
          if (dispatch) {
            tr.doc.descendants((node, pos) => {
              const marks = node.marks.filter(
                mark => mark.type.name === this.name && mark.attrs.id === id
              );
              marks.forEach(mark => {
                tr.removeMark(pos, pos + node.nodeSize, mark);
              });
            });
          }
          return true;
        },
    };
  },
});
