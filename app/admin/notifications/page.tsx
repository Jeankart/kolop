'use client';

import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';

interface NotificationStats {
  totalSubscribed: number;
  recentNotifications: Array<{
    id: string;
    title: string;
    body: string;
    sentAt: string;
    count: number;
  }>;
}

export default function NotificationsAdmin() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<NotificationStats | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/notifications/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !body.trim()) {
      setMessage('El título y mensaje son obligatorios');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/notifications/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN || 'demo'}`,
        },
        body: JSON.stringify({
          title,
          body,
          category: category || undefined,
          url: category ? `/${category.toLowerCase()}` : '/',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ Notificación enviada a ${data.sent} usuarios`);
        setTitle('');
        setBody('');
        setCategory('');
        fetchStats();
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'Anime',
    'Aesthetic',
    'AI',
    'Cars',
    'Charging',
    'Cute',
    'Featured',
    'Films',
    'Widgets',
    'Urban',
    'B&W',
    'iOS',
    'Live',
  ];

  return (
    <div className="min-h-screen pt-32 pb-10 bg-[#151515]">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Push Notifications</h1>

        {/* Stats */}
        {stats && (
          <div className="bg-[#1f1f1f] rounded-lg p-6 mb-8 border border-[#2f2f2f]">
            <p className="text-[#a0a0a0] mb-2">Usuarios suscritos</p>
            <p className="text-4xl font-bold text-[#00d084]">{stats.totalSubscribed}</p>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSendNotification} className="bg-[#1f1f1f] rounded-lg p-6 border border-[#2f2f2f] space-y-6">
          <div>
            <label className="block text-white font-semibold mb-2">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ej: Nuevos wallpapers de Anime"
              className="w-full bg-[#0a0a0a] border border-[#2f2f2f] rounded-lg px-4 py-2 text-white placeholder-[#6b6b6b] focus:outline-none focus:border-[#00d084]"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Mensaje</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="ej: Acabamos de agregar 20 nuevos wallpapers de tu categoría favorita"
              rows={4}
              className="w-full bg-[#0a0a0a] border border-[#2f2f2f] rounded-lg px-4 py-2 text-white placeholder-[#6b6b6b] focus:outline-none focus:border-[#00d084] resize-none"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Categoría (opcional)</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#2f2f2f] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00d084]"
            >
              <option value="">-- Todos los usuarios --</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00d084] hover:bg-[#00c075] text-black font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
            {loading ? 'Enviando...' : 'Enviar Notificación'}
          </button>
        </form>

        {/* Mensaje */}
        {message && (
          <div className={`mt-6 p-4 rounded-lg ${message.startsWith('✅') ? 'bg-[#00d084]/20 border border-[#00d084]' : 'bg-red-500/20 border border-red-500'}`}>
            <p className={message.startsWith('✅') ? 'text-[#00d084]' : 'text-red-400'}>
              {message}
            </p>
          </div>
        )}

        {/* Historial */}
        {stats && stats.recentNotifications.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-white mb-4">Últimas Notificaciones</h2>
            <div className="space-y-3">
              {stats.recentNotifications.map((notif) => (
                <div key={notif.id} className="bg-[#1f1f1f] rounded-lg p-4 border border-[#2f2f2f]">
                  <p className="text-white font-semibold">{notif.title}</p>
                  <p className="text-[#a0a0a0] text-sm mt-1">{notif.body}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-[#6b6b6b] text-xs">{notif.sentAt}</span>
                    <span className="text-[#00d084] text-sm">Enviado a {notif.count} usuarios</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
