// app/login/layout.js
export const metadata = {
    title: "register - Note Keeping",
    description: "register page for Note Keeping app",
  };
  
  export default function RegisterLayout({ children }) {
    return (
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    );
  }
  