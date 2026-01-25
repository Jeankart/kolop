'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import Header from '@/app/components/Header';
import BottomNavigation from '@/app/components/BottomNavigation';

export default function PrivacyPage() {
  return (
    <main className="bg-zinc-950 min-h-screen overflow-x-hidden">
      <Header />
      <section className="px-4 md:px-6 py-8 max-w-3xl mx-auto pt-24 pb-20">
        {/* Header con botón de regreso */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/settings" className="text-white hover:text-[#00d084] transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Política de Privacidad</h1>
        </div>

        {/* Contenido */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 space-y-6 text-zinc-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-3">1. Información que Recopilamos</h2>
            <p className="mb-2">
              Recopilamos información de uso como:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Tipos de wallpapers descargados</li>
              <li>Páginas visitadas</li>
              <li>Información del dispositivo</li>
              <li>Dirección IP (anonimizada)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">2. Cómo Usamos tu Información</h2>
            <p className="mb-2">
              Utilizamos tu información para:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Mejorar la experiencia del usuario</li>
              <li>Mostrar anuncios personalizados</li>
              <li>Analizar tendencias de uso</li>
              <li>Proporcionar un mejor servicio</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">3. Cookies y Tecnologías Similares</h2>
            <p>
              Utilizamos cookies para mejorar tu experiencia. Puedes deshabilitarlas en la configuración de tu navegador.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">4. Terceros</h2>
            <p className="mb-2">
              Compartimos información con:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Google AdSense (para anuncios)</li>
              <li>Propeller Ads (para anuncios)</li>
              <li>Proveedores de análisis</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">5. Seguridad</h2>
            <p>
              Implementamos medidas de seguridad para proteger tu información personal. Sin embargo, ningún método de transmisión por Internet es 100% seguro.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">6. Cambios en la Política</h2>
            <p>
              Podemos actualizar esta política de privacidad en cualquier momento. Te notificaremos de cambios significativos publicando la nueva política en nuestro sitio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">7. Contacto</h2>
            <p>
              Si tienes preguntas sobre esta política, por favor contacta a: <span className="text-[#00d084]">support@wallpaper.com</span>
            </p>
          </section>

          <div className="border-t border-zinc-700 pt-6 mt-6 text-xs text-zinc-500">
            <p>Última actualización: 25 de enero de 2026</p>
          </div>
        </div>
      </section>

      <BottomNavigation />
    </main>
  );
}
