// services/authService.js
import supabase from '../config/supabase.js';

export class AuthService {

  /**
   * Sign up with email and password (requires email verification)
   */
  static async signUpWithEmail(email, password, fullName) {
    try {
      console.log("AuthService: signUpWithEmail", email, password, fullName);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.FRONTEND_URL}/auth/callback`,
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) throw error;

      return {
        success: true,
        user: data.user,
        session: data.session,
        message: data.user.identities ?
          (data.user.identities.length === 0 ?
            'User already exists but email not confirmed' :
            'Check your email for confirmation link') : null

      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Send magic link for passwordless login
   */
  static async sendMagicLink(email) {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${process.env.FRONTEND_URL}/auth/callback`,
        }
      });

      if (error) throw error;

      return {
        success: true,
        message: 'Check your email for the magic link'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Sign in with password (fallback method)
   */
  static async signInWithPassword(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // Check if email is verified
      if (!data.user.email_confirmed_at) {
        return {
          success: false,
          error: 'Please verify your email before signing in',
          requiresVerification: true
        };
      }

      return {
        success: true,
        user: data.user,
        session: data.session,
        token: data.session.access_token
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get Google OAuth URL
   */
  static async getGoogleOAuthUrl() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${process.env.FRONTEND_URL}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });

      if (error) throw error;

      return {
        success: true,
        url: data.url
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Verify email confirmation token
   */
  static async verifyEmailToken(token_hash, type) {
    try {
      const validTypes = ['signup', 'magiclink', 'email'];
      if (!validTypes.includes(type)) {
        throw new Error(`Invalid OTP type: ${type}. Expected: signup, magiclink, email`);
      }
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash,
        type, // 'signup' or 'email'
      });

      if (error) throw error;

      return {
        success: true,
        user: data.user,
        session: data.session
      };
    } catch (error) {
      console.log('')
      return {
        success: false,
        error: error.message

      };
    }
  }

  /**
   * Resend email confirmation
   */
  static async resendConfirmation(email) {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup', //email
        email,
        options: {
          emailRedirectTo: `${process.env.FRONTEND_URL}/auth/callback`
        }
      });

      if (error) throw error;

      return {
        success: true,
        message: 'Confirmation email sent'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Sign out user
   */
  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      return {
        success: true,
        message: 'Signed out successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get current user
   */
  static async getCurrentUser(token) {
    try {
      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (error) throw error;

      if (!user) {
        return {
          success: false,
          error: 'No user found'
        };
      }

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      return {
        success: true,
        user: user,
        profile: profile || null,
        profileError: profileError ? profileError.message : null
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Refresh session
   */
  static async refreshSession(refreshToken) {
    try {
      const { data, error } = await supabase.auth.refreshSession({
        refresh_token: refreshToken
      });

      if (error) throw error;

      return {
        success: true,
        session: data.session
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}