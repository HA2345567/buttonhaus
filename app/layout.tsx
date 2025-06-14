import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ButtonHaus | Premium Garment Accessories',
  description: 'High-quality buttons, zippers, hooks, lace, and fabric patches for all your garment needs. Fast shipping, premium quality, and exceptional service.',
  keywords: 'buttons, zippers, hooks, lace, fabric patches, garment accessories, sewing supplies, fashion accessories',
  authors: [{ name: 'ButtonHaus Team' }],
  openGraph: {
    title: 'ButtonHaus | Premium Garment Accessories',
    description: 'High-quality buttons, zippers, hooks, lace, and fabric patches for all your garment needs.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ButtonHaus | Premium Garment Accessories',
    description: 'High-quality buttons, zippers, hooks, lace, and fabric patches for all your garment needs.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('theme');
                  if (mode === 'dark' || (!mode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}