// import { StrictMode } from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App.tsx";
// import React from "react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import AuthProvider from "react-auth-kit";
// import createStore from "react-auth-kit/createStore";

// const queryClient = new QueryClient();
// // Create the store with authentication settings
// const store = createStore({
//   authName: "_auth",
//   authType: "localstorage",
//   cookieDomain: window.location.hostname,
//   cookieSecure: false,
// });

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <StrictMode>
//     <AuthProvider store={store}>
//       <QueryClientProvider client={queryClient}>
//         <App />
//       </QueryClientProvider>
//     </AuthProvider>
//     </StrictMode>
// );
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";

// Create a client for React Query
const queryClient = new QueryClient();

// Create the auth store with correct settings for React Auth Kit v3.1.3
const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthProvider store={store}>
    <App />
  </AuthProvider>
);
