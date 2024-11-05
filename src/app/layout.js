
import {Noto_Kufi_Arabic} from 'next/font/google';
import "./globals.css";
import Navbar from "./components/navbar/page";
import Footer from "./components/footer/page";
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Script from 'next/script';
// import { icons } from '@react-icons/all-files';
import { AppProvider } from './context/AppContext';

const NotoKufiArabic = Noto_Kufi_Arabic({
  subsets: ['arabic'] 
});
  
    

export const metadata = {
  title: "مستقل",
  description: "Mostaqel clone mearn stack iti final project",
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }) {

  return (
    
    <html lang="en">


      <body
        className={NotoKufiArabic.className} 
      >

<AppProvider>
<Navbar></Navbar>



        {children}


<Footer></Footer>
</AppProvider>



   <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          strategy="beforeInteractive" // Or "afterInteractive"
        /> 

      </body>


    </html>
  );


}
