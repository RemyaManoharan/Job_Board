import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import LoadingSpinner from "./components/LoadingSpinner";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});
const HomePage = lazy(() => import("./pages/HomePage"));
const JobDetailsPage = lazy(() => import("./pages/JobDetailsPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage"));

const queryClient = new QueryClient();
function App() {
  return (
    <AuthProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <HomePage />
                  </Suspense>
                }
              />
              <Route
                path="jobs"
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <HomePage />
                  </Suspense>
                }
              />
              <Route
                path="jobs/:id"
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <JobDetailsPage />
                  </Suspense>
                }
              />
              <Route
                path="login"
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <LoginPage />
                  </Suspense>
                }
              />
              <Route
                path="profile"
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <UserProfilePage />
                  </Suspense>
                }
              />
              <Route
                path="signup"
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <SignUpPage />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
