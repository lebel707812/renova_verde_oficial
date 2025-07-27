import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: 'swap', // Otimização para evitar FOUC
  preload: true,
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: 'swap', // Otimização para evitar FOUC
  preload: false, // Não precarregar fonte mono para melhor performance
});

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: "Renova Verde Hub" }],
  creator: "Renova Verde Hub",
  publisher: "Renova Verde Hub",
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // TODO: Adicionar códigos de verificação do Google Search Console e outros
    // google: 'google-verification-code',
    // yandex: 'yandex-verification-code',
    // yahoo: 'yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        {/* Preconnect para melhor performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Theme color para mobile */}
        <meta name="theme-color" content="#1a3f32" />
        <meta name="msapplication-TileColor" content="#1a3f32" />
        
        {/* Viewport otimizado */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Schema.org JSON-LD para Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Website',
              name: SITE_CONFIG.name,
              description: SITE_CONFIG.description,
              url: SITE_CONFIG.url,
              logo: `${SITE_CONFIG.url}/images/logo.png`,
              sameAs: [
                'https://instagram.com/renovaverdehub',
                'https://facebook.com/renovaverdehub',
                'https://youtube.com/@renovaverdehub',
                'https://linkedin.com/company/renovaverdehub'
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 font-sans`}
        suppressHydrationWarning={true}
      >
        {/* Script para evitar FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.documentElement.style.visibility = 'hidden';
                document.documentElement.style.opacity = '0';
                
                function showContent() {
                  document.documentElement.style.visibility = 'visible';
                  document.documentElement.style.opacity = '1';
                  document.documentElement.style.transition = 'opacity 0.3s ease-in-out';
                }
                
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', showContent);
                } else {
                  showContent();
                }
              })();
            `,
          }}
        />
        
        {children}
      </body>
    </html>
  );
}
