'use client';

import { useState, useEffect } from 'react';
import MobileHomePage from '@/My-components/Mobile/Page/MobileHomePage';
// Make sure to import your new desktop component
import DesktopHomePage from '@/My-components/Desktop/Pages/DesktopHomePage'; 

export default function Home() {
  // You can default to either true or false. 
  // Defaulting to true means mobile users get the right UI slightly faster on first paint.
  const [isMobile, setIsMobile] = useState(true); 
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // This code only runs on the client after the initial render
    setHasMounted(true);
    
    // Check the width once on load, with no event listeners attached
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 1024);
    }
  }, []);

  // Prevent hydration mismatch by not rendering the environment-dependent UI 
  // until the component has safely mounted on the client.
  if (!hasMounted) {
    return null; // Or a generic loading spinner/skeleton
  }

  return (
    <main>
      {isMobile ? <MobileHomePage /> : <DesktopHomePage />}
    </main>
  );
}