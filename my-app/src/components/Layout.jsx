import React from "react";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from './Navbar'
export default function Layout({ children }) {
  const location = useLocation();
  const [showing, setshowing] = useState(false)
  console.log(location.pathname);
  useEffect(() => {
    if (location.pathname.includes("signup")) {
      setshowing(true)
    }
  }, [location.pathname])
  return (
    <div className="flex flex-col min-h-screen">
      {!showing ? <Navbar /> : null}
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
} 