'use client';

import { useEffect, useState } from 'react';

export default function FullResyncPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const executeResync = async () => {
      setStatus('loading');
      try {
        const response = await fetch('/api/admin/full-resync', {
          method: 'POST',
        });

        const data = await response.json();
        setResults(data);
        setStatus('done');
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Error desconocido';
        setError(errorMsg);
        setStatus('done');
      }
    };

    executeResync();
  }, []);

  return (
    <main className="bg-zinc-950 min-h-screen text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔄 Full Resync Wallpapers</h1>

        {status === 'loading' && (
          <div className="bg-zinc-900 p-8 rounded-lg">
            <p className="text-lg">⏳ Procesando wallpapers...</p>
            <div className="mt-4 animate-pulse">
              <div className="h-4 bg-zinc-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-zinc-700 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-zinc-700 rounded w-2/3"></div>
            </div>
          </div>
        )}

        {status === 'done' && error && (
          <div className="bg-red-900 p-8 rounded-lg">
            <p className="text-lg font-bold">❌ Error: {error}</p>
          </div>
        )}

        {status === 'done' && results && (
          <div className="bg-zinc-900 p-8 rounded-lg space-y-6">
            <div className="bg-green-900 p-4 rounded border border-green-700">
              <p className="text-xl font-bold">{results.message}</p>
            </div>

            {results.stats && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-zinc-800 p-4 rounded">
                  <p className="text-gray-400 text-sm">Eliminados</p>
                  <p className="text-2xl font-bold">{results.stats.deletedCount}</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded">
                  <p className="text-gray-400 text-sm">Archivos Encontrados</p>
                  <p className="text-2xl font-bold">{results.stats.filesProcessed}</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded">
                  <p className="text-gray-400 text-sm">Grupos</p>
                  <p className="text-2xl font-bold">{results.stats.groupsCreated}</p>
                </div>
                <div className="bg-green-800 p-4 rounded">
                  <p className="text-gray-400 text-sm">Creados</p>
                  <p className="text-2xl font-bold">{results.stats.successCount}</p>
                </div>
                <div className="bg-red-800 p-4 rounded">
                  <p className="text-gray-400 text-sm">Errores</p>
                  <p className="text-2xl font-bold">{results.stats.errorCount}</p>
                </div>
              </div>
            )}

            <div className="space-y-2 max-h-96 overflow-y-auto">
              <p className="text-sm text-gray-400">Detalles del proceso:</p>
              {results.results?.map((result: any, index: number) => (
                <div key={index} className="bg-zinc-800 p-3 rounded text-sm font-mono">
                  {result.step && <p className="text-blue-400">📍 Paso {result.step}: {result.message}</p>}
                  {result.success && <p className="text-green-400">{result.success}</p>}
                  {result.error && <p className="text-red-400">{result.error}</p>}
                  {result.warning && <p className="text-yellow-400">{result.warning}</p>}
                  {result.message && !result.step && <p className="text-gray-300">{result.message}</p>}
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <a
                href="/ios"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
              >
                Ver página IOS →
              </a>
              <a
                href="/"
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-center"
              >
                Ir a inicio →
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
