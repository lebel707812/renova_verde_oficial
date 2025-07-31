'use client';

import React, { useCallback, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';

interface TiptapEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({
  value,
  onChange,
  placeholder = "Digite o conteúdo do artigo...",
  height = "500px"
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = useCallback(async (file: File): Promise<string> => {
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file); // A API espera 'file', não 'image'

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha no upload da imagem');
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Erro no upload da imagem:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg shadow-md my-4',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    immediatelyRender: false, // Corrige o erro de SSR
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[600px] p-4 border-0 rounded-lg overflow-y-auto',
      },
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith('image/')) {
            event.preventDefault();
            handleImageUpload(file).then((url) => {
              const { schema } = view.state;
              const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
              if (coordinates) {
                const node = schema.nodes.image.create({ src: url });
                const transaction = view.state.tr.insert(coordinates.pos, node);
                view.dispatch(transaction);
              }
            }).catch((error) => {
              alert('Erro ao fazer upload da imagem: ' + error.message);
            });
            return true;
          }
        }
        return false;
      },
      handlePaste: (view, event, slice) => {
        const items = Array.from(event.clipboardData?.items || []);
        for (const item of items) {
          if (item.type.startsWith('image/')) {
            event.preventDefault();
            const file = item.getAsFile();
            if (file) {
              handleImageUpload(file).then((url) => {
                const { schema } = view.state;
                const node = schema.nodes.image.create({ src: url });
                const transaction = view.state.tr.replaceSelectionWith(node);
                view.dispatch(transaction);
              }).catch((error) => {
                alert('Erro ao fazer upload da imagem: ' + error.message);
              });
            }
            return true;
          }
        }
        return false;
      },
    },
  });

  const addImage = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && editor) {
        try {
          const url = await handleImageUpload(file);
          editor.chain().focus().setImage({ src: url }).run();
        } catch (error) {
          alert('Erro ao fazer upload da imagem: ' + (error as Error).message);
        }
      }
    };
    input.click();
  }, [editor, handleImageUpload]);

  if (!editor) {
    return null;
  }

  return (
    <div className="tiptap-editor-container" style={{ height }}>
      {/* Toolbar */}
      <div className="border border-gray-300 border-b-0 rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`px-3 py-1 text-sm rounded border ${
            editor.isActive('bold')
              ? 'bg-blue-500 text-white border-blue-500'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
          }`}
        >
          <strong>B</strong>
        </button>
        
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`px-3 py-1 text-sm rounded border ${
            editor.isActive('italic')
              ? 'bg-blue-500 text-white border-blue-500'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
          }`}
        >
          <em>I</em>
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 text-sm rounded border ${
            editor.isActive('heading', { level: 2 })
              ? 'bg-blue-500 text-white border-blue-500'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
          }`}
        >
          H2
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1 text-sm rounded border ${
            editor.isActive('heading', { level: 3 })
              ? 'bg-blue-500 text-white border-blue-500'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
          }`}
        >
          H3
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 text-sm rounded border ${
            editor.isActive('bulletList')
              ? 'bg-blue-500 text-white border-blue-500'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
          }`}
        >
          Lista
        </button>

        <button
          type="button"
          onClick={addImage}
          disabled={isUploading}
          className="px-3 py-1 text-sm rounded border bg-green-100 text-green-700 border-green-300 hover:bg-green-200 disabled:opacity-50"
        >
          {isUploading ? '...' : '📷 Imagem'}
        </button>
      </div>

      {/* Editor */}
      <div className="border border-gray-300 rounded-b-lg overflow-y-auto" style={{ minHeight: height, height: height }}>
        <EditorContent editor={editor} />
      </div>

      {isUploading && (
        <div className="mt-2 text-sm text-blue-600">
          Fazendo upload da imagem...
        </div>
      )}


    </div>
  );
};

export default TiptapEditor;

