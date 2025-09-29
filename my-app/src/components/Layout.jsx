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
    <div >
      {!showing ? <Navbar /> : null}
      <main >
        {children}
      </main>
      <Footer />
    </div>
  );
} 