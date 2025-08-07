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
    return config;
  }
};

export default nextConfig;