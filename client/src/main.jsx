import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { GoogleOAuthProvider } from "@react-oauth/google";

import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";

// Check Google Client ID loaded by Vite
console.log(
  "GOOGLE CLIENT ID:",
  import.meta.env.VITE_GOOGLE_CLIENT_ID
);

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
    >
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);