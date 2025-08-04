/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Adicione estas configurações para rotas API
  experimental: {
    skipMiddlewareUrlNormalize: true,
    skipTrailingSlashRedirect: true,
  },
  // Configuração para rotas de API
  api: {
    externalResolver: true,
    bodyParser: false,
  },
  // Opcional: Ignora verificação de tipos durante o build para rotas API
  webpack: (config) => {
    config.infrastructureLogging = {
      level: 'error',
    };
    return config;
  },
};

export default nextConfig;