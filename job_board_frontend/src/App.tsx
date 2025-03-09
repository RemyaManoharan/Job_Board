import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import JobDetailsPage from "./pages/JobDetailsPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Layout from "./components/Layout/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import UserProfilePage from "./pages/UserProfilePage";
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit';

const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

const queryClient = new QueryClient();
function App() {
  return (
    <AuthProvider store={store}>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="jobs" element={<HomePage />} />
            <Route path="jobs/:id" element={<JobDetailsPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="signup" element={<SignUpPage />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
