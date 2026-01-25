'use client';

import { useEffect, useState } from 'react';

export default function AutoUploadPage() {
  const [status, setStatus] = useState<string>('Iniciando...');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const scanAndUpload = async () => {
      try {
        setStatus('Escaneando archivos...');
        
        // Llamar a la API para procesar automáticamente
        const response = await fetch('/api/admin/auto-upload-wallpapers', {
          method: 'POST',
        });

        const data = await response.json();

        if (data.success) {
          setStatus(`✅ ${data.message}`);
          setResults(data.results || []);
        } else {
          setStatus(`❌ Error: ${data.message}`);
        }
      } catch (error) {
        setStatus(`❌ Error: ${error}`);
      }
    };

    scanAndUpload();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Auto Upload Wallpapers</h1>
        
        <div className="bg-zinc-900 p-6 rounded-lg mb-6">
          <p className="text-white text-lg mb-4">{status}</p>
        </div>

        {results.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white mb-4">Resultados:</h2>
            {results.map((result, idx) => (
              <div
                key={idx}
                className={`p-4 rounded text-sm font-mono ${
                  result.success ? 'bg-green-950 text-green-300' : 'bg-red-950 text-red-300'
                }`}
              >
                {result.message}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
