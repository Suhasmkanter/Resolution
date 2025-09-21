import supabase from "../config/supabase.js";

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'No valid authorization token provided'
      });
    }

    const token = authHeader.split(' ')[1];
    console.log(token, "The token from the header");


    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'No token found in authorization header'
      });
    }

    // Verify token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired token'
      });
    }

    // Add user to request object for use in controllers
    req.user = user;
    next();

  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      error: 'Authentication service error'
    });
  }
};