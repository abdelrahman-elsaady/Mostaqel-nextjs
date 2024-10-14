// 'use client';

// import { useAppContext } from './../context/AppContext';
// import Navbar from "./../components/navbar/page";
// import Footer from "./../components/footer/page";
// import { AppProvider } from './../context/AppContext';
// import { useState, useEffect } from 'react';

// export default function ClientLayout({ children }) {
//     const [isProfileComplete, setIsProfileComplete] = useState(false);

//     useEffect(() => {
//       // Here you can add logic to check if the profile is complete
//       // For now, let's assume it's always complete after initial render
//       setIsProfileComplete(false);
//     }, []);
//   return (
//     <AppProvider>
//     {isProfileComplete && <Navbar />}
//     {children}
//     {isProfileComplete && <Footer />}
//   </AppProvider>
//   );
// }