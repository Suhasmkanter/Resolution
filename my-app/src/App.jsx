import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AuthCallback from "./pages/AuthCallback";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import PhotoPage from "./pages/PhotoPage";
import useAuthStore from "./store/useAuthStore";
import { supabase } from "./supabaseClient";
import Explore from "./pages/Explore";
import Learning from "./pages/Learning";
import GridConcepts from "./pages/GridConcepts";
import Profilepage from "./pages/Profilepage";
import EmailVerification from "./pages/EmailVerification";

function App() {
  // In your Auth store or App root
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const location = useLocation();
  console.log(location, 'protected route location')
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      console.log(data)
      if (data?.session?.user) {
        useAuthStore.getState().setUser(data.session.user); // populate your store
      }
    };
    getSession();
  }, []);



  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/photo/:id" element={<PhotoPage />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/gridconcepts" element={<GridConcepts />} />
        <Route path='/emailVerification' element={<EmailVerification />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profilepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />
        {/* <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        /> */}
      </Routes>
    </Layout>
  );
}

export default App;
