# Environment Setup Guide

Your BillCraft application is now properly configured to handle missing environment variables gracefully. Follow this guide to complete the setup.

## Required Environment Variables

Add these to your `.env.local` file in the project root:

### Firebase Client Configuration (Required)
```bash
# Firebase Client SDK (already configured)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Supabase Configuration (Required)
```bash
# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Supabase Admin (for user sync) - ADD THIS!
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### Firebase Admin SDK (Optional - for trial system)
```bash
# Firebase Admin SDK (optional)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account@your_project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

## Setup Instructions

### 1. Complete Supabase Setup (Critical)

**You need to add the missing service role key:**

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Click on your project
3. Go to **Settings** → **API**
4. Find the **`service_role`** key (NOT the anon key)
5. Copy it and add to your `.env.local`:
   ```bash
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### 2. Optional: Firebase Admin SDK (for trial system)

If you want the trial system to work:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** → **Service Accounts**
4. Click **Generate New Private Key**
5. Download the JSON file
6. Extract these values and add to `.env.local`:
   ```bash
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_CONTENT\n-----END PRIVATE KEY-----\n"
   ```

## Current Status

✅ **App loads properly** - No more crashes  
✅ **Firebase Auth works** - Login/signup functional  
✅ **Graceful error handling** - Missing config won't crash app  
🔧 **Supabase user sync** - Add service role key to complete  
🔧 **Trial system** - Add Firebase Admin config for full functionality  

## Testing Your Setup

1. **Restart your development server** after adding environment variables:
   ```bash
   npm run dev
   ```

2. **Test user signup:**
   - Go to `/auth/signup`
   - Create a new account
   - Check browser console for sync logs
   - Check Supabase dashboard for new user

3. **Verify in Supabase:**
   - Go to your Supabase project
   - Check the **Table Editor** → **users** table
   - You should see your user with Firebase UID

## Troubleshooting

### If users still don't appear in Supabase:
1. Check that `SUPABASE_SERVICE_ROLE_KEY` is added correctly
2. Restart your development server
3. Check browser console for error messages
4. Verify the service role key is correct (not the anon key)

### If trial system doesn't work:
1. Add Firebase Admin environment variables
2. Restart your development server
3. The trial APIs will return proper error messages if not configured

## Need Help?

The app is designed to work gracefully even with missing configuration. Core functionality (auth, dashboard) works without the optional Firebase Admin setup.

Priority: **Add the Supabase service role key first** - this is essential for user sync to work properly. 