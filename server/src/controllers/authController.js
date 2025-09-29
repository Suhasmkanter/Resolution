// controllers/authController.js
import supabase from '../config/supabase.js';
import { AuthService } from '../services/authService.js';
import nodemailer from "nodemailer";
/**
 * Sign up with email and password (requires email verification)
 */
export const signUp = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 8 characters long'
      });
    }

    const result = await AuthService.signUpWithEmail(email, password, fullName);
    if (result.user) {
      const { data, error } = await supabase.from('userAuth').insert([
        { userAuthID: result.user.id, email, username: fullName }
      ]).select().limit(1);
      if (error) {
        console.error('Supabase insert error:', error);
      }
    }
    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.status(201).json({
      success: true,
      message: result.message,
      requiresVerification: !result.session, // No session means verification needed
      data: {
        user: result.user,
        session: result.session
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error during signup'
    });
  }
};

/**
 * Send magic link for passwordless login
 */
export const sendMagicLink = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }

    const result = await AuthService.sendMagicLink(email);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json({
      success: true,
      message: 'Magic link sent! Check your email.',
      type: 'magic_link'
    });

  } catch (error) {
    console.error('Magic link error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send magic link'
    });
  }
};

/**
 * Sign in with password (fallback method)
 */
export const signInWithPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    const result = await AuthService.signInWithPassword(email, password);

    if (!result.success) {
      const statusCode = result.requiresVerification ? 403 : 401;
      return res.status(statusCode).json(result);
    }

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: result.user,
        token: result.token,
        session: result.session
      }
    });

  } catch (error) {
    console.error('Password login error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error during login'
    });
  }
};

/**
 * Get Google OAuth URL
 */
export const getGoogleAuthUrl = async (req, res) => {
  try {
    const result = await AuthService.getGoogleOAuthUrl();

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json({
      success: true,
      authUrl: result.url,
      provider: 'google'
    });

  } catch (error) {
    console.error('Google OAuth error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate Google OAuth URL'
    });
  }
};

/**
 * Handle OAuth callback and token verification
 */
export const handleAuthCallback = async (req, res) => {
  try {


    console.log('=== AUTH CALLBACK DEBUG ===');
    console.log('Query params:', req.query);
    console.log('Full URL:', req.url);
    console.log('Method:', req.method);

    const token_hash = req.query.token_hash || req.body.token_hash;
    const type = req.query.type || req.body.type;

    console.log('Extracted token_hash:', token_hash);
    console.log('Extracted type:', type);
    console.log('========================');


    if (!token_hash || !type) {
      return res.status(400).json({
        success: false,
        error: 'Missing token or type parameter'
      });
    }

    const result = await AuthService.verifyEmailToken(token_hash, type);

    if (!result.success) {
      return res.status(400).json(result);
    }

    if (result.success && result.session.access_token) {
      res.cookie('access_token', result.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Authentication successful',
      data: {
        user: result.user,
        session: result.session,
        token: result.session ? result.session.access_token : null
      }
    });

  } catch (error) {
    console.error('Auth callback error:', error);
    return res.status(500).json({
      success: false,
      error: 'Authentication callback failed'
    });
  }
};

/**
 * Resend email confirmation
 */
export const resendConfirmation = async (req, res) => {
  console.log("Resend confirmation called")
  let { email } = req.body;


  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS // App Password
    }
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Confirmation",
    html: `<p>Click the link below to reset your password:</p>
    <a href="resetLink">Reset Password</a>
    <p>This link is valid for 15 minutes.</p>`
  });

  console.log("Email sent: ", info.messageId);
}


/**
 * Get current user profile
 */
export const getCurrentUser = async (req, res) => {
  try {
    // User is already attached by auth middleware
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null
    const result = await AuthService.getCurrentUser(token);

    if (!result.success) {
      return res.status(401).json(result);
    }

    return res.status(200).json({
      success: true,
      data: {
        user: result.user,
        profile: result.profile
      }
    });

  } catch (error) {
    console.error('Get user error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to get user information'
    });
  }
};

/**
 * Sign out user
 */
export const signOut = async (req, res) => {
  try {
    const result = await AuthService.signOut();

    return res.status(200).json({
      success: true,
      message: 'Signed out successfully'
    });

  } catch (error) {
    console.error('Signout error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to sign out'
    });
  }
};

/**
 * Refresh authentication token
 */
export const refreshToken = async (req, res) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(400).json({
        success: false,
        error: 'Refresh token is required'
      });
    }

    const result = await AuthService.refreshSession(refresh_token);

    if (!result.success) {
      return res.status(401).json(result);
    }

    return res.status(200).json({
      success: true,
      data: {
        session: result.session,
        token: result.session.access_token
      }
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to refresh token'
    });
  }
};