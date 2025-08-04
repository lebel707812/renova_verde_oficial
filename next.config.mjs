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
  // Adicione esta configuração para o Prisma
  webpack: (config) => {
    config.externals = [...(config.externals || []), '@prisma/client'];
    return config;
  }
};

export default nextConfig;