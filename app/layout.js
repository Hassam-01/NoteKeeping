// app/layout.js
'use client'; // Mark this component as a client component

import { Inter } from "next/font/google";
import SideBar from "./_components/SideBar";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { useRouter } from "next/navigation";

// Load the font for the layout
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login'; // Check if the current route is the login page
  const isRegisterPage = router.pathname === '/register'; // Check if the current route is the register page

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <StoreProvider>
          {/* Conditionally render the SideBar
          {(!isLoginPage && !isRegisterPage) && (
            <div className="hidden md:block md:w-[200px] h-full z-20"> {/* Only show on md and larger */}
            {/*  <SideBar />
            </div>
          )}
            */}
          {/* <main className={`h-screen w-full ${!isLoginPage && !isRegisterPage ? 'md:w-[calc(100%-200px)]' : 'w-full'} z-10`}> */}
          <main >
            {children}
          </main>
        </StoreProvider>
      </body>
    </html>
    );
}
