'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Importar ReactQuill dinamicamente para evitar problemas de SSR
const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />
});

// Importar estilos do Quill
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
}

export default function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Digite o conteúdo do artigo...",
  height = "400px"
}: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false);
  const quillRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handler personalizado para upload de imagens
  function imageHandler() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          const quill = quillRef.current?.getEditor();
          if (quill) {
            const range = quill.getSelection();
            quill.insertEmbed(range?.index || 0, 'image', data.url);
            
            // Adicionar espaçamento após a imagem
            quill.insertText(range?.index + 1 || 1, '\n\n');
            quill.setSelection(range?.index + 2 || 2);
          }
        } else {
          alert('Erro ao fazer upload da imagem: ' + (data.error || 'Erro desconhecido'));
        }
      } catch (error) {
        alert('Erro ao fazer upload da imagem');
        console.error('Upload error:', error);
      }
    };
  }

  // Configuração das ferramentas do editor
  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'align': [] }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        image: imageHandler,
      }
    },
    clipboard: {
      matchVisual: false,
    }
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'list', 'bullet',
    'indent',
    'direction', 'align',
    'blockquote', 'code-block',
    'link', 'image', 'video'
  ];

  if (!mounted) {
    return <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />;
  }

  return (
    <div className="rich-text-editor">
      <style jsx global>{`
        .rich-text-editor .ql-editor {
          min-height: ${height};
          font-family: inherit;
          font-size: 16px;
          line-height: 1.6;
        }
        
        .rich-text-editor .ql-toolbar {
          border-top: 1px solid #d1d5db;
          border-left: 1px solid #d1d5db;
          border-right: 1px solid #d1d5db;
          border-bottom: none;
          border-radius: 0.5rem 0.5rem 0 0;
          background: #f9fafb;
        }
        
        .rich-text-editor .ql-container {
          border-bottom: 1px solid #d1d5db;
          border-left: 1px solid #d1d5db;
          border-right: 1px solid #d1d5db;
          border-top: none;
          border-radius: 0 0 0.5rem 0.5rem;
          font-family: inherit;
        }
        
        .rich-text-editor .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
        }
        
        .rich-text-editor .ql-editor h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 1em 0 0.5em 0;
        }
        
        .rich-text-editor .ql-editor h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 1em 0 0.5em 0;
        }
        
        .rich-text-editor .ql-editor h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 1em 0 0.5em 0;
        }
        
        .rich-text-editor .ql-editor p {
          margin: 0.5em 0;
        }
        
        .rich-text-editor .ql-editor ul, 
        .rich-text-editor .ql-editor ol {
          margin: 0.5em 0;
          padding-left: 1.5em;
        }
        
        .rich-text-editor .ql-editor blockquote {
          border-left: 4px solid #d1d5db;
          padding-left: 1em;
          margin: 1em 0;
          font-style: italic;
          color: #6b7280;
        }
        
        .rich-text-editor .ql-editor code {
          background: #f3f4f6;
          padding: 0.2em 0.4em;
          border-radius: 0.25rem;
          font-family: 'Courier New', monospace;
        }
        
        .rich-text-editor .ql-editor pre {
          background: #f3f4f6;
          padding: 1em;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1em 0;
        }
        
        .rich-text-editor .ql-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1em 0;
          display: block;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .rich-text-editor .ql-editor a {
          color: #059669;
          text-decoration: underline;
        }
        
        .rich-text-editor .ql-editor a:hover {
          color: #047857;
        }
        
        /* Estilo para foco */
        .rich-text-editor .ql-container.ql-snow {
          border-color: #d1d5db;
        }
        
        .rich-text-editor:focus-within .ql-container.ql-snow {
          border-color: #059669;
          box-shadow: 0 0 0 1px #059669;
        }
        
        .rich-text-editor:focus-within .ql-toolbar.ql-snow {
          border-color: #059669;
        }

        /* Melhorias para imagens */
        .rich-text-editor .ql-editor img:hover {
          transform: scale(1.02);
          transition: transform 0.2s ease-in-out;
        }

        /* Estilos para diferentes tamanhos de imagem */
        .rich-text-editor .ql-editor img[style*="width: 25%"] {
          float: left;
          margin: 0.5em 1em 0.5em 0;
        }

        .rich-text-editor .ql-editor img[style*="width: 50%"] {
          margin: 1em auto;
          display: block;
        }

        .rich-text-editor .ql-editor img[style*="width: 75%"] {
          margin: 1em auto;
          display: block;
        }

        /* Tooltip para botão de imagem */
        .rich-text-editor .ql-toolbar .ql-image {
          position: relative;
        }

        .rich-text-editor .ql-toolbar .ql-image::after {
          content: "Clique para adicionar imagem intercalada no artigo";
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: #374151;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s;
          z-index: 1000;
        }

        .rich-text-editor .ql-toolbar .ql-image:hover::after {
          opacity: 1;
        }
      `}</style>
      
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
}

