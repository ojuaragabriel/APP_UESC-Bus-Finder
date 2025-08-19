// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Gera site estático (SSG) compatível com Capacitor
  output: 'export',

  // Desativa a otimização do next/image (que exige servidor)
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Mantém seus relaxamentos (se quiser pode remover depois)
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
