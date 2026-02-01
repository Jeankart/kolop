# Push Notifications Setup Guide

## What's Implemented

✅ Service Worker registration
✅ Push notification receiver
✅ Subscription management API
✅ Admin panel to send notifications
✅ Notification history tracking

## What You Need to Do

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or use existing one
3. Go to **Project Settings** (gear icon)
4. Click on **Cloud Messaging** tab
5. Copy your **Server API Key** and **Sender ID**

### Step 2: Generate VAPID Keys

1. In Firebase Console, go to **Project Settings** > **Cloud Messaging**
2. Under "Web Push certificates", click **Generate Key Pair**
3. Copy the **Public Key** (this goes in your `.env.local`)

### Step 3: Configure Environment Variables

Create/update `.env.local` file:

```env
NEXT_PUBLIC_VAPID_KEY=your_public_key_here
NEXT_PRIVATE_FIREBASE_SERVER_KEY=your_server_api_key
NEXT_PUBLIC_ADMIN_TOKEN=your_secret_admin_token
```

### Step 4: Test Notifications

1. Start the app: `npm run dev`
2. Visit `/admin/notifications`
3. The app will ask for notification permission (first visit)
4. Accept the permission
5. Send a test notification from the admin panel

### Step 5: Production Setup

For real push notifications, you need to:

1. **Store subscriptions in database:**
   - Replace in-memory storage with MongoDB/Firestore
   - Save subscriptions when users subscribe
   - Query subscriptions when sending

2. **Implement actual Web Push:**
   - Install `web-push` package: `npm install web-push`
   - Use server API key to send real push notifications

3. **Secure the admin endpoint:**
   - Implement proper authentication
   - Use JWT tokens instead of Bearer token

### Example: Setup with MongoDB

```typescript
// app/api/notifications/subscribe/route.ts
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  const subscription = await req.json();
  
  await addDoc(collection(db, 'subscriptions'), {
    endpoint: subscription.endpoint,
    p256dh: subscription.keys.p256dh,
    auth: subscription.keys.auth,
    createdAt: new Date(),
  });
  
  return NextResponse.json({ success: true });
}
```

### Example: Send Real Push Notifications

```typescript
// app/api/admin/notifications/send/route.ts
import webpush from 'web-push';

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  process.env.NEXT_PUBLIC_VAPID_KEY!,
  process.env.NEXT_PRIVATE_FIREBASE_SERVER_KEY!
);

// In the send endpoint:
for (const subscription of subscriptions) {
  await webpush.sendNotification(subscription, JSON.stringify({
    title: 'Your title',
    body: 'Your message',
    icon: '/kloop-logo.png',
  }));
}
```

## Testing

### Browser DevTools

1. Open DevTools (F12)
2. Go to **Application** tab
3. **Service Workers** - check if registered
4. **Manifest** - check PWA setup

### Test Without Notification Permission

If stuck on permission request:
- Clear site data in DevTools
- Or use incognito mode

## Troubleshooting

**Service Worker not registering?**
- Check browser console for errors
- Ensure you're on HTTPS (or localhost)

**No notification permission option?**
- Refresh page
- Check browser notification settings
- May be blocked by browser

**Subscriptions not saving?**
- Check Network tab in DevTools
- Verify `/api/notifications/subscribe` endpoint works

## Files Created

- `/lib/hooks/usePushNotifications.ts` - Hook for managing subscriptions
- `/public/sw.js` - Service Worker
- `/app/api/notifications/subscribe/route.ts` - Subscription endpoint
- `/app/api/notifications/unsubscribe/route.ts` - Unsubscribe endpoint
- `/app/api/admin/notifications/send/route.ts` - Send notification endpoint
- `/app/api/admin/notifications/stats/route.ts` - Stats endpoint
- `/app/admin/notifications/page.tsx` - Admin panel

## Next Steps

1. ✅ Complete the Firebase setup above
2. ✅ Add your VAPID key to `.env.local`
3. ✅ Test notification subscription
4. ✅ Move to real database for production
5. ✅ Implement rate limiting for admin endpoint
