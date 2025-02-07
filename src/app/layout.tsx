"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  // Only render the theme provider after the component has mounted on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // If the component has not mounted yet, return null to prevent SSR issues
  if (!mounted) return null;

  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light" // Set default theme for SSR
          enableSystem={true} // Allow system preferences
          disableTransitionOnChange={true} // Prevent transition effects on hydration
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
