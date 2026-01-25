'use client';

import { useEffect, useState } from 'react';

export default function HardDeletePage() {
  const [status, setStatus] = useState<'idle' | 'deleting' | 'syncing' | 'done'>('idle');
  const [deleteResults, setDeleteResults] = useState<any>(null);
  const [syncResults, setSyncResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const executeCleanup = async () => {
      try {
        setStatus('deleting');
        console.log('1️⃣ Ejecutando HARD DELETE...');
        
        const deleteResponse = await fetch('/api/admin/hard-delete', {
          method: 'POST',
        });

        const deleteData = await deleteResponse.json();
        setDeleteResults(deleteData);
        
        if (!deleteData.success) {
          throw new Error('HARD DELETE falló');
        }

        console.log('2️⃣ HARD DELETE completado. Esperando 2 segundos...');
        await new Promise(resolve => setTimeout(resolve, 2000));

        setStatus('syncing');
        console.log('3️⃣ Ejecutando FULL RESYNC...');
        
        const syncResponse = await fetch('/api/admin/full-resync', {
          method: 'POST',
        });

        const syncData = await syncResponse.json();
        setSyncResults(syncData);
        
        setStatus('done');
        console.log('✅ Todo completado!');
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Error desconocido';
        setError(errorMsg);
        setStatus('done');
      }
    };

    executeCleanup();
  }, []);

  return (
    <main className="bg-zinc-950 min-h-screen text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔥 Limpieza Total + Resync</h1>

        {status === 'deleting' && (
          <div className="bg-red-900 p-8 rounded-lg">
            <p className="text-lg font-bold">🔥 Borrando TODOS los documentos...</p>
            <div className="mt-4 animate-pulse">
              <div className="h-4 bg-red-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-red-700 rounded w-1/2"></div>
            </div>
          </div>
        )}

        {status === 'syncing' && (
          <div className="bg-blue-900 p-8 rounded-lg">
            <p className="text-lg font-bold">📦 Sincronizando wallpapers...</p>
            <div className="mt-4 animate-pulse">
              <div className="h-4 bg-blue-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-blue-700 rounded w-1/2"></div>
            </div>
          </div>
        )}

        {status === 'done' && error && (
          <div className="bg-red-900 p-8 rounded-lg">
            <p className="text-lg font-bold">❌ Error: {error}</p>
          </div>
        )}

        {status === 'done' && deleteResults && (
          <div className="space-y-6">
            <div className="bg-red-900 p-6 rounded-lg border border-red-700">
              <p className="text-xl font-bold mb-4">{deleteResults.message}</p>
              {deleteResults.stats && (
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Intentados</p>
                    <p className="text-2xl font-bold">{deleteResults.stats.attemptedDelete}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Borrados</p>
                    <p className="text-2xl font-bold">{deleteResults.stats.deletedCount}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Restantes</p>
                    <p className="text-2xl font-bold text-green-400">{deleteResults.stats.remainingCount}</p>
                  </div>
                </div>
              )}
            </div>

            {syncResults && (
              <div className="bg-green-900 p-6 rounded-lg border border-green-700">
                <p className="text-xl font-bold mb-4">{syncResults.message}</p>
                {syncResults.stats && (
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Archivos</p>
                      <p className="text-2xl font-bold">{syncResults.stats.filesProcessed}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Grupos</p>
                      <p className="text-2xl font-bold">{syncResults.stats.groupsCreated}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Creados</p>
                      <p className="text-2xl font-bold text-green-300">{syncResults.stats.successCount}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Errores</p>
                      <p className="text-2xl font-bold text-red-300">{syncResults.stats.errorCount}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-4">
              <a
                href="/ios"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded text-center"
              >
                Ver página IOS →
              </a>
              <a
                href="/"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded text-center"
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
