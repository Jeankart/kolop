'use client';

import { Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonsProps {
  wallpaperName: string;
  wallpaperId: string;
  category?: string;
}

export default function ShareButtons({ wallpaperName, wallpaperId, category = 'Wallpaper' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://kloop.vercel.app`;
  const shareText = `Check out this amazing ${category} wallpaper: "${wallpaperName}"`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareX = () => {
    const xUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(xUrl, '_blank', 'width=550,height=420');
  };

  const handleSharePinterest = () => {
    const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(shareText)}`;
    window.open(pinterestUrl, '_blank', 'width=750,height=650');
  };

  const handleShareInstagram = () => {
    // Instagram doesn't have direct web share, show instruction
    alert('Open Instagram and share this link in your story or DM:\n\n' + shareUrl);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 transition-colors text-white text-sm font-medium"
        aria-label="Share wallpaper"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>

      {showShareMenu && (
        <div className="absolute top-full right-0 mt-2 bg-zinc-800 rounded-lg shadow-lg overflow-hidden z-50 min-w-48 border border-zinc-700">
          <button
            onClick={handleShareX}
            className="w-full px-4 py-3 text-left hover:bg-zinc-700 transition-colors text-white text-sm flex items-center gap-3"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55A3.016 3.016 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Share on X
          </button>

          <button
            onClick={handleSharePinterest}
            className="w-full px-4 py-3 text-left hover:bg-zinc-700 transition-colors text-white text-sm flex items-center gap-3"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.937-.197-2.383.042-3.41.216-.937 1.402-5.938 1.402-5.938s-.357-.715-.357-1.784c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.03-.657 2.571-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-.287-.035-.568-.09-.842.09-.046.18-.092.27-.138A9.968 9.968 0 0 0 20 12c0-5.627-4.373-10-10-10z" />
            </svg>
            Save to Pinterest
          </button>

          <button
            onClick={handleShareInstagram}
            className="w-full px-4 py-3 text-left hover:bg-zinc-700 transition-colors text-white text-sm flex items-center gap-3"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm3.5-10a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0zm1.5 0a5 5 0 11-10 0 5 5 0 0110 0zm.5-5.5a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
            Share on Instagram
          </button>

          <div className="border-t border-zinc-700" />

          <button
            onClick={handleCopyLink}
            className="w-full px-4 py-3 text-left hover:bg-zinc-700 transition-colors text-white text-sm flex items-center gap-3"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                Link copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy link
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
