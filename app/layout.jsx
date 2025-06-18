// import React from "react"; - No longer need this import when we use NextJS
// layout.jsx will be a component that will be used through out the whole application(Shared with all pages)
import "@styles/globals.css"; //Do not have to directly mention the full path, we can just use @filename
import Nav from "@components/Nav";
import Provider from "@components/Provider";
export const metadata = {
  title: "AIPrompts",
  description: "Discover and Share AI Prompts",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

