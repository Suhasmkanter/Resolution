// routes/authRoutes.js
import express from 'express';
import {
  signUp,
  sendMagicLink,
  signInWithPassword,
  getGoogleAuthUrl,
  handleAuthCallback,
  resendConfirmation,
  getCurrentUser,
  signOut,
  refreshToken
} from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes (no authentication required)

/**
 * POST /api/auth/signup
 * Sign up with email and password (requires email verification)
 * Body: { email, password, fullName? }
 */
router.post('/signup', signUp);

/**
 * POST /api/auth/magic-link
 * Send magic link for passwordless login
 * Body: { email }
 */
router.post('/magic-link', sendMagicLink);

/**
 * POST /api/auth/signin
 * Sign in with password (fallback method)
 * Body: { email, password }
 */
router.post('/signin', signInWithPassword);

/**
 * GET /api/auth/google
 * Get Google OAuth URL for frontend redirect
 * Returns: { authUrl }
 */
router.get('/google', getGoogleAuthUrl);

/**
 * GET /api/auth/callback
 * Handle authentication callback (email verification, magic links)
 * Query: { token_hash, type }
 */
router.get('/callback', handleAuthCallback);

/**
 * POST /api/auth/resend-confirmation
 * Resend email confirmation
 * Body: { email }
 */
router.post('/resend-confirmation', resendConfirmation);

/**
 * POST /api/auth/refresh
 * Refresh authentication token
 * Body: { refresh_token }
 */
router.post('/refresh', refreshToken);

// Protected routes (authentication required)

/**
 * GET /api/auth/me
 * Get current user profile
 * Headers: Authorization: Bearer <token>
 */
router.get('/me', requireAuth, getCurrentUser);

/**
 * POST /api/auth/signout
 * Sign out current user
 * Headers: Authorization: Bearer <token>
 */
router.post('/signout', requireAuth, signOut);

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Resolution Auth service is running',
    timestamp: new Date().toISOString(),
    endpoints: {
      signup: 'POST /api/auth/signup',
      magicLink: 'POST /api/auth/magic-link',
      signin: 'POST /api/auth/signin',
      google: 'GET /api/auth/google',
      callback: 'GET /api/auth/callback',
      me: 'GET /api/auth/me (protected)',
      signout: 'POST /api/auth/signout (protected)',
      refresh: 'POST /api/auth/refresh'
    }
  });
});

export default router;