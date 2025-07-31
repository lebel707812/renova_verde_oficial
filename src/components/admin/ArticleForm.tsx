'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import TiptapEditor from './TiptapEditor';
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
  const [showPreview, setShowPreview] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout>();

  // Auto-save function
  const autoSave = useCallback(async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      return;
    }

    setAutoSaveStatus('saving');
    
    try {
      const url = isEditing ? `/api/articles/${article?.id}` : '/api/articles';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          isPublished: false // Auto-save sempre como rascunho
        }),
      });

      if (response.ok) {
        setAutoSaveStatus('saved');
        setLastSaved(new Date());
        setTimeout(() => setAutoSaveStatus('idle'), 2000);
      } else {
        setAutoSaveStatus('error');
        setTimeout(() => setAutoSaveStatus('idle'), 3000);
      }
    } catch {
      setAutoSaveStatus('error');
      setTimeout(() => setAutoSaveStatus('idle'), 3000);
    }
  }, [formData, isEditing, article?.id]);

  // Trigger auto-save when content changes
  useEffect(() => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    // Auto-save após 3 segundos de inatividade
    autoSaveTimeoutRef.current = setTimeout(() => {
      autoSave();
    }, 3000);

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [formData.title, formData.content, formData.category, autoSave]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  }, []);

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

  const getAutoSaveStatusText = () => {
    switch (autoSaveStatus) {
      case 'saving':
        return 'Salvando...';
      case 'saved':
        return `Salvo automaticamente ${lastSaved ? `às ${lastSaved.toLocaleTimeString()}` : ''}`;
      case 'error':
        return 'Erro ao salvar automaticamente';
      default:
        return '';
    }
  };

  const getAutoSaveStatusColor = () => {
    switch (autoSaveStatus) {
      case 'saving':
        return 'text-blue-600';
      case 'saved':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                {isEditing ? 'Editar Artigo' : 'Novo Artigo'}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              {/* Status do Auto-save */}
              <div className={`text-xs ${getAutoSaveStatusColor()} flex items-center`}>
                {autoSaveStatus === 'saving' && (
                  <svg className="animate-spin -ml-1 mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {getAutoSaveStatusText()}
              </div>
              
              {/* Toggle Preview */}
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                  showPreview 
                    ? 'bg-green-100 text-green-700 border-green-300' 
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
              >
                {showPreview ? '📝 Editor' : '👁️ Preview'}
              </button>
            </div>
          </div>
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

          {/* Editor de Conteúdo com Preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Conteúdo do Artigo *
              </label>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Editor */}
              <div className={showPreview ? 'hidden lg:block' : ''}>
                <TiptapEditor
                  value={formData.content}
                  onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                  placeholder="Digite o conteúdo do artigo..."
                  height="700px"
                />
              </div>

              {/* Preview */}
              <div className={`${showPreview ? '' : 'hidden lg:block'} border border-gray-300 rounded-lg p-4 bg-gray-50 overflow-y-auto max-h-[700px]`}>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Preview:</h4>
                {formData.content ? (
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: formData.content }}
                  />
                ) : (
                  <p className="text-gray-500 text-sm italic">Digite algo no editor para ver o preview...</p>
                )}
              </div>
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

