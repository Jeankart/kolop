'use client';

import { X, Share2, Plus, Home } from 'lucide-react';

interface InstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InstallGuideModal({ isOpen, onClose }: InstallGuideModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-end sm:items-end justify-center p-4 pt-0">
        <div className="bg-[#1f1f1f] rounded-t-3xl sm:rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border border-[#686868]/20 sm:border-[#686868]/20">
          {/* Header */}
          <div className="sticky top-0 bg-[#1f1f1f] border-b border-[#686868]/20 px-6 py-3 flex items-center justify-between rounded-t-3xl sm:rounded-t-2xl">
            <h2 className="text-lg font-bold text-white">Save to your device</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#686868]/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* iPhone */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#00d084]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#00d084]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">iPhone / iPad</h3>
              </div>
              <div className="bg-[#2a2a2a] rounded-lg p-4 space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-[#00d084] text-black text-sm font-bold">
                      1
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-medium">Tap the Share button</p>
                    <p className="text-sm text-[#a0a0a0] mt-1">Look for the share icon in the bottom bar</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-[#00d084] text-black text-sm font-bold">
                      2
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-medium">Select "Add to Home Screen"</p>
                    <p className="text-sm text-[#a0a0a0] mt-1">Scroll down and find this option in the menu</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-[#00d084] text-black text-sm font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-medium">Customize and confirm</p>
                    <p className="text-sm text-[#a0a0a0] mt-1">Tap "Add" and the app will appear on your home screen</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Android */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#00d084]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#00d084]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5S11.5 23.33 11.5 22.5V19h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1v-2H6v2zm13-13H5c-.55 0-1 .45-1 1v10h16V6c0-.55-.45-1-1-1zm-6 6H7V7h6v4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Android</h3>
              </div>
              <div className="bg-[#2a2a2a] rounded-lg p-4 space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-[#00d084] text-black text-sm font-bold">
                      1
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-medium">Open the menu (⋮)</p>
                    <p className="text-sm text-[#a0a0a0] mt-1">Look for the three vertical dots in the upper right corner</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-[#00d084] text-black text-sm font-bold">
                      2
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-medium">Select "Install app"</p>
                    <p className="text-sm text-[#a0a0a0] mt-1">Or "Add to Home Screen"</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-[#00d084] text-black text-sm font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-medium">Confirm the installation</p>
                    <p className="text-sm text-[#a0a0a0] mt-1">The app will appear on your home screen</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Benefits of saving:</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Home className="w-5 h-5 text-[#00d084]" />
                  <span className="text-white">Quick access from your home screen</span>
                </div>
                <div className="flex items-center gap-3">
                  <Plus className="w-5 h-5 text-[#00d084]" />
                  <span className="text-white">Experience similar to a native app</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-[#686868]/20 p-6 bg-[#1f1f1f]">
            <button
              onClick={onClose}
              className="w-full bg-[#00d084] text-black font-semibold py-3 rounded-lg hover:bg-[#00d084]/90 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </>
  );
}