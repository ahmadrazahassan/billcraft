import { initializeApp, getApps, cert, App } from 'firebase-admin/app'
import { getAuth, Auth } from 'firebase-admin/auth'

// Check if Firebase Admin environment variables are available
const hasFirebaseAdminConfig = () => {
  return !!(
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  )
}

let adminApp: App | null = null
let adminAuth: Auth | null = null

// Initialize Firebase Admin SDK only if config is available
const initializeFirebaseAdmin = () => {
  if (!hasFirebaseAdminConfig()) {
    console.warn('⚠️  Firebase Admin SDK not configured. Missing environment variables:')
    console.warn('- FIREBASE_PROJECT_ID')
    console.warn('- FIREBASE_CLIENT_EMAIL') 
    console.warn('- FIREBASE_PRIVATE_KEY')
    return null
  }

  if (getApps().length === 0) {
    try {
      const firebaseAdminConfig = {
        projectId: process.env.FIREBASE_PROJECT_ID!,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
        privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      }

      adminApp = initializeApp({
        credential: cert(firebaseAdminConfig),
        projectId: process.env.FIREBASE_PROJECT_ID!,
      })

      adminAuth = getAuth(adminApp)
      console.log('✅ Firebase Admin SDK initialized successfully')
      return adminApp
    } catch (error) {
      console.error('❌ Failed to initialize Firebase Admin SDK:', error)
      return null
    }
  } else {
    adminApp = getApps()[0]
    adminAuth = getAuth(adminApp)
    return adminApp
  }
}

// Get admin auth instance with error handling
const getAdminAuth = () => {
  if (!adminAuth) {
    initializeFirebaseAdmin()
  }
  
  if (!adminAuth) {
    throw new Error('Firebase Admin SDK not configured. Please add the required environment variables.')
  }
  
  return adminAuth
}

// Verify Firebase ID token
export async function verifyIdToken(idToken: string) {
  try {
    const auth = getAdminAuth()
    const decodedToken = await auth.verifyIdToken(idToken)
    return decodedToken
  } catch (error: any) {
    if (error.message.includes('not configured')) {
      throw new Error('Firebase Admin not configured')
    }
    console.error('Error verifying ID token:', error)
    throw new Error('Invalid token')
  }
}

// Get user by UID
export async function getUserByUid(uid: string) {
  try {
    const auth = getAdminAuth()
    const userRecord = await auth.getUser(uid)
    return userRecord
  } catch (error: any) {
    if (error.message.includes('not configured')) {
      throw new Error('Firebase Admin not configured')
    }
    console.error('Error fetching user:', error)
    throw new Error('User not found')
  }
}

// Create custom token
export async function createCustomToken(uid: string, additionalClaims?: object) {
  try {
    const auth = getAdminAuth()
    const customToken = await auth.createCustomToken(uid, additionalClaims)
    return customToken
  } catch (error: any) {
    if (error.message.includes('not configured')) {
      throw new Error('Firebase Admin not configured')
    }
    console.error('Error creating custom token:', error)
    throw new Error('Failed to create custom token')
  }
}

// Export admin auth (with null check)
export const getAdminAuthInstance = () => {
  try {
    return getAdminAuth()
  } catch (error) {
    return null
  }
}

// Check if Firebase Admin is available
export const isFirebaseAdminAvailable = () => {
  return hasFirebaseAdminConfig()
} 