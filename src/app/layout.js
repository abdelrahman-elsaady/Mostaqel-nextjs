
import {Noto_Kufi_Arabic} from 'next/font/google';
import "./globals.css";
import Navbar from "./components/navbar/page";
import Footer from "./components/footer/page";
import 'bootstrap/dist/css/bootstrap.min.css';

const NotoKufiArabic = Noto_Kufi_Arabic({
  subsets: ['arabic'] 
});


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">


      <body
        className={NotoKufiArabic.className}
      >
<Navbar></Navbar>
        {children}

<Footer></Footer>

      </body>

    </html>
  );
}
