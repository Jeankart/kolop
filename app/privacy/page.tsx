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
        {/* Header with back button */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/settings" className="text-white hover:text-[#00d084] transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Privacy Policy</h1>
        </div>

        {/* Content */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 space-y-6 text-zinc-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-3">1. Information We Collect</h2>
            <p className="mb-2">
              We collect usage information such as:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Types of wallpapers downloaded</li>
              <li>Pages visited</li>
              <li>Device information</li>
              <li>IP address (anonymized)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">2. How We Use Your Information</h2>
            <p className="mb-2">
              We use your information to:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Improve user experience</li>
              <li>Display personalized ads</li>
              <li>Analyze usage trends</li>
              <li>Provide better service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">3. Cookies and Similar Technologies</h2>
            <p>
              We use cookies to improve your experience. You can disable them in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">4. Third Parties</h2>
            <p className="mb-2">
              We share information with:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Google AdSense (for ads)</li>
              <li>Propeller Ads (for ads)</li>
              <li>Analytics providers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">5. Security</h2>
            <p>
              We implement security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">6. Changes to This Policy</h2>
            <p>
              We may update this privacy policy at any time. We will notify you of significant changes by posting the new policy on our site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">7. Contact</h2>
            <p>
              If you have questions about this policy, please contact us at: <span className="text-[#00d084]">support@kloop.vercel.app</span>
            </p>
          </section>

          <div className="border-t border-zinc-700 pt-6 mt-6 text-xs text-zinc-500">
            <p>Last updated: January 25, 2026</p>
          </div>
        </div>
      </section>

      <BottomNavigation />
    </main>
  );
}
