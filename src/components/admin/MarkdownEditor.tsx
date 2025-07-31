'use client';

import React, { useState, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  placeholder = "Digite o conteúdo do artigo...",
  height = "500px"
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (file: File): Promise<string> => {
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Falha no upload da imagem');
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Erro no upload da imagem:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const insertImage = async () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await handleImageUpload(file);
      const imageMarkdown = `![${file.name}](${imageUrl})`;
      
      // Inserir a imagem no final do conteúdo atual
      const newValue = value + '\n\n' + imageMarkdown + '\n\n';
      onChange(newValue);
      
      // Limpar o input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      alert('Erro ao fazer upload da imagem. Tente novamente.');
    }
  };

  const customCommands = [
    {
      name: 'image',
      keyCommand: 'image',
      buttonProps: { 'aria-label': 'Adicionar imagem' },
      icon: (
        <svg width="12" height="12" viewBox="0 0 20 20">
          <path
            fill="currentColor"
            d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zM2 4h16v8l-3.5-3.5c-.29-.29-.77-.29-1.06 0L9 13 7 11c-.29-.29-.77-.29-1.06 0L2 15.5V4z"
          />
        </svg>
      ),
      execute: () => {
        insertImage();
      },
    },
  ];

  return (
    <div className="markdown-editor-container">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || '')}
        height={parseInt(height)}
        preview="edit"
        hideToolbar={false}
        visibleDragBar={false}
        textareaProps={{
          placeholder,
          style: {
            fontSize: 14,
            lineHeight: 1.6,
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
          },
        }}
        commands={[
          ...customCommands,
        ]}
        data-color-mode="light"
      />
      
      {isUploading && (
        <div className="mt-2 text-sm text-blue-600">
          Fazendo upload da imagem...
        </div>
      )}
      
      <style jsx global>{`
        .markdown-editor-container .w-md-editor {
          background-color: white;
        }
        
        .markdown-editor-container .w-md-editor-text-container,
        .markdown-editor-container .w-md-editor-text-input,
        .markdown-editor-container .w-md-editor-text-textarea {
          font-size: 14px !important;
          line-height: 1.6 !important;
        }
        
        .markdown-editor-container .w-md-editor-toolbar {
          border-bottom: 1px solid #e5e7eb;
        }
        
        .markdown-editor-container .w-md-editor-toolbar li button {
          color: #374151;
        }
        
        .markdown-editor-container .w-md-editor-toolbar li button:hover {
          background-color: #f3f4f6;
        }
      `}</style>
    </div>
  );
};

export default MarkdownEditor;

