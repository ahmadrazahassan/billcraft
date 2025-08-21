# 🚀 Complete Environment Setup for BillCraft

## Quick Fix for Current Error

You're getting `TypeError: fetch failed` because environment variables are not properly configured. Here's how to fix it:

### 1. Create `.env.local` file in your project root

```bash
# Navigate to your project root (D:\BillCraft)
# Create a new file called .env.local and add the following:

# ================================
# SUPABASE CONFIGURATION (REQUIRED)
# ================================
NEXT_PUBLIC_SUPABASE_URL=https://yuplzhbijgxaizguurdg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# ================================
# FIREBASE CONFIGURATION (REQUIRED)
# ================================
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# ================================
# OPTIONAL CONFIGURATIONS
# ================================
NODE_ENV=development
```

### 2. Get Your Supabase Keys

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (yuplzhbijgxaizguurdg)
3. Go to **Settings** → **API**
4. Copy the following:
   - **URL**: `https://yuplzhbijgxaizguurdg.supabase.co`
   - **anon/public key**: Replace `your_anon_key_here`
   - **service_role key**: Replace `your_service_role_key_here` (⚠️ Keep this secret!)

### 3. Get Your Firebase Keys

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** → **General** → **Your apps**
4. Copy the config values and replace in the `.env.local` file

### 4. Restart Your Development Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

## Error Analysis & Fixes Applied

### Issues Found:
1. ❌ **Missing environment variables** - No `.env.local` file
2. ❌ **Network connectivity issues** - Fetch timeouts
3. ❌ **Poor error handling** - Generic error messages
4. ❌ **No connection diagnostics** - Hard to debug issues

### Fixes Implemented:
1. ✅ **Enhanced Supabase client** - Better timeout handling and error diagnostics
2. ✅ **Improved error messages** - More specific error information
3. ✅ **Network connectivity tests** - Pre-flight checks before operations
4. ✅ **Better environment validation** - Clear instructions for missing config
5. ✅ **Retry logic improvements** - Enhanced failure handling in sync operations

## Professional Improvements Made

### 1. Enhanced Network Handling
- Added 30-second timeout for requests
- Custom fetch implementation with abort controllers
- Network connectivity pre-checks
- Specific error messages for different failure types

### 2. Better Error Diagnostics
```typescript
// Before: Generic "fetch failed" error
// After: Specific messages like:
- "Network connection failed. Please check your internet connection and try again."
- "Request timed out. Please check your connection and try again."
- "Database configuration error. Please check your environment variables."
```

### 3. Environment Validation
- Automatic validation of required environment variables
- Clear setup instructions in error messages
- Fallback values where appropriate
- Comprehensive logging for debugging

### 4. Production-Ready Features
- User-Agent headers for API requests
- Proper connection pooling
- Graceful error handling
- Detailed logging for monitoring

## Testing Your Setup

### 1. Environment Test
```bash
# After creating .env.local and restarting server
# Check console logs for:
✅ SUPABASE ENVIRONMENT CHECK:
- URL: https://yuplzhbijgxaizguurdg.supabase.co
- Anon Key Present: true
- Service Key Present: true
```

### 2. Connectivity Test
```bash
# Visit: http://localhost:3000/api/test-sync
# POST with Firebase user data
# Should see: ✅ Supabase connectivity test passed
```

### 3. User Sync Test
```bash
# Create a new user via signup
# Check console for successful sync logs
# Verify user appears in Supabase dashboard
```

## Security Notes

⚠️ **Important Security Guidelines:**

1. **Never commit `.env.local`** - Already in `.gitignore`
2. **Service role key is sensitive** - Can access all data
3. **Use environment variables in production** - Not hardcoded values
4. **Rotate keys regularly** - Especially if exposed

## Troubleshooting

### Still getting fetch errors?
1. **Check internet connection** - Try accessing Supabase dashboard
2. **Verify Supabase URL** - Make sure project is accessible
3. **Check Windows firewall** - May be blocking Node.js requests
4. **Try different network** - Corporate networks may block external APIs
5. **Check Supabase status** - Visit [status.supabase.com](https://status.supabase.com)

### Environment variables not loading?
1. **Restart development server** - Required after changing `.env.local`
2. **Check file location** - Must be in project root, not subdirectory
3. **Check file name** - Must be exactly `.env.local`
4. **No spaces around equals** - `KEY=value` not `KEY = value`

## Next Steps

After fixing the environment setup:

1. ✅ **User authentication** - Should work seamlessly
2. ✅ **User sync to Supabase** - Automatic on signup/login
3. ✅ **Trial system** - Automatic 3-month trial setup
4. ✅ **Dashboard functionality** - Full access to features
5. ✅ **Invoice generation** - Complete workflow

Your BillCraft application is now production-ready with robust error handling and professional-grade connectivity management!
