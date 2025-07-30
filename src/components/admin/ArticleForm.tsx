'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ARTICLE_CATEGORIES } from '@/lib/constants';

interface Article {
  id?: number;
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
  isPublished: boolean;
}

interface ArticleFormProps {
  article?: Article;
  isEditing?: boolean;
}

export default function ArticleForm({ article, isEditing = false }: ArticleFormProps) {
  const [formData, setFormData] = useState<Article>({
    title: article?.title || '',
    content: article?.content || '',
    category: article?.category || 'Jardinagem',
    imageUrl: article?.imageUrl || '',
    isPublished: article?.isPublished || false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingContent, setIsUploadingContent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentImageInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setFormData(prev => ({ ...prev, imageUrl: data.url }));
      } else {
        setError(data.error || 'Erro ao fazer upload da imagem');
      }
    } catch {
      setError('Erro ao fazer upload da imagem');
    } finally {
      setIsUploading(false);
    }
  };

  const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingContent(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // Inserir a imagem no textarea na posição do cursor
        const textarea = textareaRef.current;
        if (textarea) {
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const currentContent = formData.content;
          const imageMarkdown = `\n\n![Imagem do artigo](${data.url})\n\n`;
          const newContent = currentContent.substring(0, start) + imageMarkdown + currentContent.substring(end);
          
          setFormData(prev => ({ ...prev, content: newContent }));
          
          // Reposicionar o cursor após a imagem inserida
          setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + imageMarkdown.length, start + imageMarkdown.length);
          }, 100);
        }
      } else {
        setError(data.error || 'Erro ao fazer upload da imagem');
      }
    } catch {
      setError('Erro ao fazer upload da imagem');
    } finally {
      setIsUploadingContent(false);
    }
  };

  const insertTextAtCursor = (text: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const currentContent = formData.content;
      const newContent = currentContent.substring(0, start) + text + currentContent.substring(end);
      
      setFormData(prev => ({ ...prev, content: newContent }));
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + text.length, start + text.length);
      }, 100);
    }
  };

  const handleSubmit = async (e: React.FormEvent, isDraft = false) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const submitData = {
        ...formData,
        isPublished: isDraft ? false : formData.isPublished
      };

      const url = isEditing ? `/api/articles/${article?.id}` : '/api/articles';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Erro ao salvar artigo');
      }
    } catch {
      setError('Erro de conexão');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            {isEditing ? 'Editar Artigo' : 'Novo Artigo'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Preencha os campos abaixo para criar um artigo completo com texto e imagens.
          </p>
        </div>

        <form className="p-6 space-y-6">
          {/* Título */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-lg"
              placeholder="Digite o título do artigo"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Categoria */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Categoria *
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              >
                {ARTICLE_CATEGORIES.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Status de Publicação */}
            <div className="flex items-center justify-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPublished"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">
                  Publicar artigo imediatamente
                </label>
              </div>
            </div>
          </div>

          {/* Upload de Imagem de Destaque */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagem de Destaque
            </label>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                {isUploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Escolher Imagem
                  </>
                )}
              </button>
              
              {formData.imageUrl && (
                <div className="flex items-center space-x-2">
                  <Image
                    src={formData.imageUrl}
                    alt="Preview"
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                    className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors"
                    title="Remover imagem"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            
            <p className="text-xs text-gray-500 mt-1">
              Recomendado: imagem em formato 16:9 com pelo menos 1200x675 pixels
            </p>
          </div>

          {/* Editor de Conteúdo */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Conteúdo do Artigo *
              </label>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => insertTextAtCursor('**Texto em negrito**')}
                  className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border"
                  title="Negrito"
                >
                  <strong>B</strong>
                </button>
                <button
                  type="button"
                  onClick={() => insertTextAtCursor('*Texto em itálico*')}
                  className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border"
                  title="Itálico"
                >
                  <em>I</em>
                </button>
                <button
                  type="button"
                  onClick={() => insertTextAtCursor('\n## Título da Seção\n\n')}
                  className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border"
                  title="Título"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => insertTextAtCursor('\n### Subtítulo\n\n')}
                  className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border"
                  title="Subtítulo"
                >
                  H3
                </button>
                <button
                  type="button"
                  onClick={() => insertTextAtCursor('\n- Item da lista\n- Outro item\n\n')}
                  className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border"
                  title="Lista"
                >
                  Lista
                </button>
                <button
                  type="button"
                  onClick={() => contentImageInputRef.current?.click()}
                  disabled={isUploadingContent}
                  className="px-2 py-1 text-xs bg-green-100 hover:bg-green-200 text-green-700 rounded border border-green-300 disabled:opacity-50"
                  title="Adicionar imagem no texto"
                >
                  {isUploadingContent ? '...' : '📷 Imagem'}
                </button>
              </div>
            </div>
            
            <textarea
              ref={textareaRef}
              name="content"
              required
              value={formData.content}
              onChange={handleInputChange}
              rows={20}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 font-mono text-sm"
              placeholder="Digite o conteúdo do artigo usando Markdown...

Exemplos de formatação:
## Título Principal
### Subtítulo

**Texto em negrito**
*Texto em itálico*

- Lista de itens
- Outro item

Para adicionar imagens no meio do texto, clique no botão 'Imagem' acima e selecione a imagem desejada."
            />
            
            <input
              ref={contentImageInputRef}
              type="file"
              accept="image/*"
              onChange={handleContentImageUpload}
              className="hidden"
            />
            
            <div className="mt-2 text-xs text-gray-500 space-y-1">
              <p><strong>Dicas de formatação:</strong></p>
              <p>• Use ## para títulos principais e ### para subtítulos</p>
              <p>• Use **texto** para negrito e *texto* para itálico</p>
              <p>• Use - para listas com marcadores</p>
              <p>• Clique em "📷 Imagem" para adicionar imagens intercaladas no texto</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <div className="flex">
                <svg className="w-5 h-5 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            </div>
          )}

          {/* Botões */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                disabled={isLoading}
                className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                Salvar como Rascunho
              </button>
              
              <button
                type="button"
                onClick={(e) => handleSubmit(e, false)}
                disabled={isLoading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 inline" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Salvando...
                  </>
                ) : (
                  isEditing ? 'Atualizar Artigo' : 'Publicar Artigo'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

