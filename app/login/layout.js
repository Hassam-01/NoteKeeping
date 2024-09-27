// app/login/layout.js
export const metadata = {
    title: "Login - Note Keeping",
    description: "Login page for Note Keeping app",
  };
  
  export default function LoginLayout({ children }) {
    return (
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    );
  }
  