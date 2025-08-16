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
  const [uploadProgress, setUploadProgress] = useState(0);
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

    // Auto-save após 30 segundos de inatividade
    autoSaveTimeoutRef.current = setTimeout(() => {
      autoSave();
    }, 30000);

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

    console.log('=== INICIANDO UPLOAD DE IMAGEM ===');
    console.log('Arquivo selecionado:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    setIsUploading(true);
    setError('');
    setUploadProgress(0);

    // Validações no frontend
    if (!file.type.startsWith('image/')) {
      console.error('❌ Tipo de arquivo inválido:', file.type);
      setError('Apenas imagens são permitidas');
      setIsUploading(false);
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      console.error('❌ Arquivo muito grande:', file.size);
      setError('Arquivo muito grande. Máximo 10MB.');
      setIsUploading(false);
      return;
    }

    try {
      console.log('Criando FormData...');
      const formData = new FormData();
      formData.append('file', file);
      console.log('✅ FormData criado');

      setUploadProgress(25);

      console.log('Enviando requisição para /api/upload...');
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      setUploadProgress(75);

      console.log('Resposta recebida:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });

      // Verificar se a resposta é JSON válida
      const contentType = response.headers.get('content-type');
      console.log('Content-Type da resposta:', contentType);

      if (!contentType || !contentType.includes('application/json')) {
        console.error('❌ Resposta não é JSON válido');
        const textResponse = await response.text();
        console.error('Resposta em texto:', textResponse);
        setError(`Erro no servidor: resposta inválida (${response.status}). Detalhes: ${textResponse.substring(0, 200)}...`);
        return;
      }

      let data;
      try {
        data = await response.json();
        console.log('Dados da resposta:', data);
      } catch (jsonError) {
        console.error('❌ Erro ao fazer parse do JSON:', jsonError);
        const textResponse = await response.text();
        console.error('Resposta em texto:', textResponse);
        setError('Erro ao processar resposta do servidor');
        return;
      }

      setUploadProgress(100);

      if (response.ok && data.success && data.url) {
        console.log('✅ Upload realizado com sucesso!');
        console.log('URL da imagem:', data.url);
        
        setFormData(prev => ({ ...prev, imageUrl: data.url }));
        setError('');
        
        // Mostrar mensagem de sucesso temporária
        setTimeout(() => {
          setUploadProgress(0);
        }, 1000);
        
        console.log('=== UPLOAD DE IMAGEM CONCLUÍDO COM SUCESSO ===');
      } else {
        console.error('❌ Upload falhou:', data);
        setError(data.error || 'Erro desconhecido no upload');
      }

    } catch (networkError) {
      console.error('❌ Erro de rede no upload:', networkError);
      setError('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setIsUploading(false);
      if (uploadProgress !== 100) {
        setUploadProgress(0);
      }
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
            <p className="text-red-600 text-sm">{error}</p>
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
              {(formData.metaDescription?.length ?? 0)}/160 caracteres
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
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
              
              {isUploading && (
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">{uploadProgress}%</span>
                </div>
              )}
            </div>
            
            {formData.imageUrl && (
              <div className="mt-4">
                <div className="relative inline-block">
                  <Image
                    src={formData.imageUrl}
                    alt="Preview da imagem"
                    width={200}
                    height={120}
                    className="rounded-md object-cover border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Clique no × para remover a imagem
                </p>
              </div>
            )}
          </div>

          {/* Editor de Conteúdo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Conteúdo *
            </label>
            <TiptapEditor
              value={formData.content}
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

