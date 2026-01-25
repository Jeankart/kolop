'use client';

import { useState, useEffect } from 'react';

interface ColorFilterProps {
  wallpapers: any[];
  onFilterChange: (filteredWallpapers: any[]) => void;
}

const COLOR_PALETTE = [
  { name: 'Red', hex: '#ef4444' },
  { name: 'Orange', hex: '#f97316' },
  { name: 'Yellow', hex: '#eab308' },
  { name: 'Green', hex: '#22c55e' },
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Purple', hex: '#a855f7' },
  { name: 'Pink', hex: '#ec4899' },
];

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const parseRgb = (rgb: string): { r: number; g: number; b: number } | null => {
  const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  return match
    ? {
        r: parseInt(match[1]),
        g: parseInt(match[2]),
        b: parseInt(match[3]),
      }
    : null;
};

const calculateColorDistance = (
  color1: { r: number; g: number; b: number },
  color2: { r: number; g: number; b: number }
): number => {
  return Math.sqrt(
    Math.pow(color1.r - color2.r, 2) +
      Math.pow(color1.g - color2.g, 2) +
      Math.pow(color1.b - color2.b, 2)
  );
};

export default function ColorFilter({ wallpapers, onFilterChange }: ColorFilterProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>('OFF');
  const [colorMap, setColorMap] = useState<Record<string, string>>({});

  // Inicializar con todos los wallpapers cuando está en OFF
  useEffect(() => {
    onFilterChange(wallpapers);
  }, []);

  const getDominantColor = async (imagePath: string): Promise<string | null> => {
    if (colorMap[imagePath]) {
      return colorMap[imagePath];
    }

    try {
      // @ts-ignore
      const Vibrant = (await import('vibrant')).default;
      // @ts-ignore
      const palette = await Vibrant.from(imagePath).getPalette();
      
      const dominantHex = palette.Vibrant?.getHex() || palette.Muted?.getHex() || null;
      
      if (dominantHex) {
        const mapped = mapColorToPalette(dominantHex);
        setColorMap((prev) => ({ ...prev, [imagePath]: mapped }));
        return mapped;
      }
    } catch (error) {
      console.error(`Error getting color for ${imagePath}:`, error);
    }

    return null;
  };

  const mapColorToPalette = (hexColor: string): string => {
    const rgb = hexToRgb(hexColor);
    if (!rgb) return '';

    let closestColor = '';
    let minDistance = Infinity;

    COLOR_PALETTE.forEach((color) => {
      const paletteRgb = hexToRgb(color.hex);
      if (paletteRgb) {
        const distance = calculateColorDistance(rgb, paletteRgb);
        if (distance < minDistance) {
          minDistance = distance;
          closestColor = color.name;
        }
      }
    });

    return closestColor;
  };

  const handleColorSelect = async (colorName: string) => {
    // Si es OFF, mostrar todos
    if (colorName === 'OFF') {
      setSelectedColor('OFF');
      onFilterChange(wallpapers);
      return;
    }

    // Si ya está seleccionado, deseleccionar
    if (selectedColor === colorName) {
      setSelectedColor('OFF');
      onFilterChange(wallpapers);
      return;
    }

    setSelectedColor(colorName);

    // Filtrar wallpapers por color
    const filtered: any[] = [];

    for (const wallpaper of wallpapers) {
      const imagePath = `/wallUploads/${wallpaper.image}`;
      const dominantColor = await getDominantColor(imagePath);

      if (dominantColor === colorName) {
        filtered.push(wallpaper);
      }
    }

    onFilterChange(filtered.length > 0 ? filtered : wallpapers);
  };

  return (
    <div className="w-full mb-6">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 px-4 sm:px-6 pb-2 min-w-min">
          {/* OFF Button - Inicial filter */}
          <button
            onClick={() => handleColorSelect('OFF')}
            className={`flex-shrink-0 h-3 px-3 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200 ${
              selectedColor === 'OFF'
                ? 'bg-white text-black'
                : 'border border-white border-opacity-40 text-white text-opacity-40 hover:text-opacity-60'
            }`}
            title="Show all"
          >
            OFF
          </button>

          {/* Color Pills */}
          {COLOR_PALETTE.map((color) => (
            <button
              key={color.name}
              onClick={() => handleColorSelect(color.name)}
              className={`flex-shrink-0 h-3 w-7 rounded-full transition-all duration-200 ${
                selectedColor === color.name
                  ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-950 scale-110'
                  : 'opacity-50 hover:opacity-80'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
