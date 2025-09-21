import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { Button } from "../components/ui/button";
import { FcGoogle } from "react-icons/fc";
export default function Login() {
  const { user, signIn, loginWithGoogle, loading, error, clearError } = useAuthStore();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    clearError?.();
  }, [clearError]);

  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || "/";
      window.location.href = from;
    }
  }, [user, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    try {
      if (!email || !password) {
        setFormError("Please enter email and password");
        return;
      }
      await signIn({ email, password });
    } catch (err) {
      // handled by store
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle?.();
    } catch (err) { }
  };

  if (user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Redirecting...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8 p-6 sm:p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Sign in</h2>
          <p className="text-gray-600 text-sm sm:text-base">Welcome back</p>
        </div>

        {(formError || error) && (
          <div className="p-3 rounded bg-red-50 text-red-700 text-sm">
            {formError || error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Button onClick={loginWithGoogle} className="block w-full text-sm font-medium text-white">
              <FcGoogle className="h-4 w-4 inline-block mr-1" /> Sign in with Google
            </Button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
        </div>

        <div className="text-center text-xs text-gray-500">
          Google sign-in will be added later.
          <button onClick={handleGoogleLogin} className="hidden">Google</button>
        </div>
      </div>
    </div>
  );
} 