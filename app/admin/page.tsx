'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [status, setStatus] = useState('Iniciando...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const addIOSWallpaper = async () => {
      setLoading(true);
      setStatus('Agregando wallpaper...');
      try {
        const response = await fetch('/api/admin/add-ios-wallpaper', {
          method: 'POST',
        });
        
        const data = await response.json();
        
        if (data.success) {
          setStatus(data.message + ' Ir a /ios para verlo');
        } else {
          setStatus(data.message);
        }
      } catch (error: any) {
        setStatus('❌ Error: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    addIOSWallpaper();
  }, []);

  return (
    <div className="min-h-screen bg-[#151515] text-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
        
        <div className="bg-zinc-900 p-6 rounded-lg">
          <h2 className="text-xl mb-4">Estado de Wallpaper IOS</h2>
          
          <div className={`p-3 rounded-lg ${status.includes('❌') ? 'bg-red-900' : 'bg-green-900'}`}>
            <p className="text-sm">{status}</p>
          </div>
          
          {loading && (
            <div className="mt-4 text-center">
              <p className="text-zinc-400 text-sm">Procesando...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
