'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import Header from '@/app/components/Header';
import BottomNavigation from '@/app/components/BottomNavigation';

export default function TermsPage() {
  return (
    <main className="bg-zinc-950 min-h-screen overflow-x-hidden">
      <Header />
      <section className="px-4 md:px-6 py-8 max-w-3xl mx-auto pt-24 pb-20">
        {/* Header con botón de regreso */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/settings" className="text-white hover:text-[#00d084] transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Términos de Servicio</h1>
        </div>

        {/* Contenido */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 space-y-6 text-zinc-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-3">1. Aceptación de Términos</h2>
            <p>
              Al acceder y usar Wallpaper, aceptas estos términos de servicio en su totalidad. Si no estás de acuerdo, por favor no uses nuestro servicio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">2. Licencia de Uso</h2>
            <p className="mb-2">
              Te otorgamos una licencia limitada, no exclusiva y revocable para:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Descargar wallpapers para uso personal</li>
              <li>Acceder a nuestro contenido</li>
              <li>No revender ni distribuir comercialmente</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">3. Contenido del Usuario</h2>
            <p>
              Cualquier contenido que envíes es responsabilidad tuya. Al enviar contenido, nos das licencia para usarlo en nuestro servicio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">4. Derechos de Autor</h2>
            <p className="mb-2">
              Respetamos los derechos de autor. Si crees que se ha infringido un derecho:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Contacta a support@wallpaper.com</li>
              <li>Proporciona detalles del contenido</li>
              <li>Incluye evidencia de propiedad</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">5. Prohibiciones</h2>
            <p className="mb-2">
              No debes:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Usar la app para actividades ilegales</li>
              <li>Acosar o amenazar a otros usuarios</li>
              <li>Intentar hackear o dañar el servicio</li>
              <li>Recopilar datos sin consentimiento</li>
              <li>Usar bots o scripts automatizados</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">6. Limitación de Responsabilidad</h2>
            <p>
              Wallpaper se proporciona "tal cual". No somos responsables de daños incidentales, consecuentes o punitivos. Tu único remedio es dejar de usar el servicio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">7. Cambios en el Servicio</h2>
            <p>
              Nos reservamos el derecho de modificar o discontinuar el servicio en cualquier momento, con o sin noticia previa.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">8. Terminación</h2>
            <p>
              Podemos terminar tu acceso al servicio en cualquier momento si violas estos términos o por cualquier otra razón.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">9. Ley Aplicable</h2>
            <p>
              Estos términos se rigen por la ley aplicable en tu jurisdicción.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">10. Contacto</h2>
            <p>
              Para preguntas sobre estos términos, contacta a: <span className="text-[#00d084]">support@wallpaper.com</span>
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
