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
        {/* Header with back button */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/settings" className="text-white hover:text-[#00d084] transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Terms of Service</h1>
        </div>

        {/* Content */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 space-y-6 text-zinc-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Wallpaper, you accept these terms of service in their entirety. If you do not agree, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">2. License of Use</h2>
            <p className="mb-2">
              We grant you a limited, non-exclusive and revocable license to:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Download wallpapers for personal use</li>
              <li>Access our content</li>
              <li>Not resell or commercially distribute</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">3. User Content</h2>
            <p>
              Any content you submit is your responsibility. By submitting content, you grant us a license to use it in our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">4. Copyright</h2>
            <p className="mb-2">
              We respect copyright. If you believe a copyright has been infringed:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Contact support@kloop.wallpapers.app</li>
              <li>Provide details of the content</li>
              <li>Include evidence of ownership</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">5. Prohibitions</h2>
            <p className="mb-2">
              You must not:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Use the app for illegal activities</li>
              <li>Harass or threaten other users</li>
              <li>Attempt to hack or damage the service</li>
              <li>Collect data without consent</li>
              <li>Use bots or automated scripts</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">6. Limitation of Liability</h2>
            <p>
              Wallpaper is provided "as is". We are not responsible for incidental, consequential or punitive damages. Your only remedy is to stop using the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">7. Changes to Service</h2>
            <p>
              We reserve the right to modify or discontinue the service at any time, with or without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">8. Termination</h2>
            <p>
              We may terminate your access to the service at any time if you violate these terms or for any other reason.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">9. Governing Law</h2>
            <p>
              These terms are governed by the applicable law in your jurisdiction.
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
