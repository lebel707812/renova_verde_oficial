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
  keywords?: string;
  metaDescription?: string;
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
    keywords: article?.keywords || '',
    metaDescription: article?.metaDescription || '',
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
  }, [formData.title, formData.content, formData.category, formData.keywords, formData.metaDescription, autoSave]);

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
      console.log('Starting image upload:', file.name, file.type, file.size);
      
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      console.log('Upload response status:', response.status);
      
      // Verificar se a resposta é JSON válida
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Response is not JSON:', contentType);
        const text = await response.text();
        console.error('Response text:', text);
        setError('Erro no servidor: resposta inválida');
        return;
      }

      const data = await response.json();
      console.log('Upload response data:', data);

      if (response.ok && data.success && data.url) {
        setFormData(prev => ({ ...prev, imageUrl: data.url }));
        console.log('Image uploaded successfully:', data.url);
      } else {
        console.error('Upload failed:', data);
        setError(data.error || 'Erro ao fazer upload da imagem');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Erro ao fazer upload da imagem: ' + (error as Error).message);
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

  // Função para gerar meta description automaticamente baseada no conteúdo
  const generateMetaDescription = () => {
    if (formData.content) {
      const plainText = formData.content.replace(/<[^>]*>/g, '');
      const description = plainText.substring(0, 150).trim() + '...';
      setFormData(prev => ({ ...prev, metaDescription: description }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Editar Artigo' : 'Novo Artigo'}
          </h1>
          
          {/* Status do auto-save */}
          <div className="text-sm text-gray-500">
            {getAutoSaveStatusText()}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
          {/* Título */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Digite o título do artigo"
            />
          </div>

          {/* Keywords para SEO */}
          <div>
            <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-2">
              Palavras-chave (SEO)
              <span className="text-gray-500 text-xs ml-2">
                Ex: "Reaproveitamento de Água da Chuva" - usado para gerar URL amigável
              </span>
            </label>
            <input
              type="text"
              id="keywords"
              name="keywords"
              value={formData.keywords}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ex: Reaproveitamento de Água da Chuva"
            />
            <p className="text-xs text-gray-500 mt-1">
              Se preenchido, será usado para gerar uma URL mais curta e amigável
            </p>
          </div>

          {/* Meta Description */}
          <div>
            <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 mb-2">
              Meta Description (SEO)
              <button
                type="button"
                onClick={generateMetaDescription}
                className="ml-2 text-xs text-green-600 hover:text-green-800 underline"
              >
                Gerar automaticamente
              </button>
            </label>
            <textarea
              id="metaDescription"
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleInputChange}
              rows={3}
              maxLength={160}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Descrição que aparecerá nos resultados de busca (máx. 160 caracteres)"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.metaDescription.length}/160 caracteres
            </p>
          </div>

          {/* Categoria */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Categoria *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {ARTICLE_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Upload de Imagem */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagem de Destaque
            </label>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50"
              >
                {isUploading ? 'Enviando...' : 'Escolher Imagem'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            
            {formData.imageUrl && (
              <div className="mt-4">
                <Image
                  src={formData.imageUrl}
                  alt="Preview"
                  width={200}
                  height={120}
                  className="rounded-md object-cover"
                />
              </div>
            )}
          </div>

          {/* Editor de Conteúdo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Conteúdo *
            </label>
            <TiptapEditor
              content={formData.content}
              onChange={(content) => setFormData(prev => ({ ...prev, content }))}
            />
          </div>

          {/* Publicar */}
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
              Publicar artigo
            </label>
          </div>

          {/* Botões */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.push('/admin/dashboard')}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancelar
            </button>
            
            <div className="space-x-2">
              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                disabled={isLoading}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
              >
                {isLoading ? 'Salvando...' : 'Salvar Rascunho'}
              </button>
              
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {isLoading ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Publicar')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

