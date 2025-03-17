import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import JobSphereIcon from "../../assets/job_shere.svg";

interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
}
const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();
  const auth = useAuthUser<AuthUser>();
  const navigate = useNavigate();
  const location = useLocation();
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleLogout = () => {
    signOut();
    setShowDropdown(false);
    navigate("/login");
  };
  console.log({ auth });
  const getUserInitials = () => {
    if (auth && auth.name) {
      return auth.name.charAt(0).toUpperCase();
    }
    return "U";
  };
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getLinkStyle = (path: string) => {
    return `px-4 py-2 rounded transition-colors duration-200 ${
      isActive(path) ? "text-blue-500 font-semibold" : "hover:text-primary-blue"
    }`;
  };

  return (
    <div className="w-full bg-card-white shadom-sm p-4 flex justify-between items-center">
      <div className="flex text-xl font-bold ">
        <img src={JobSphereIcon} alt="Job Sphere Logo" className="h-8 mr-2" />
        <Link to="/">Job Sphere</Link>
      </div>

      <div className="flex gap-4">
        <Link to="/jobs" className={getLinkStyle("/jobs")}>
          Find Jobs
        </Link>
        {!isAuthenticated ? (
          <>
            <Link to="/signup" className={getLinkStyle("/signup")}>
              Sign Up
            </Link>
            <Link to="/login" className={getLinkStyle("/login")}>
              Log In
            </Link>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center focus:outline-none"
            >
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium mr-2">
                {getUserInitials()}
              </div>
              <ChevronDown size={20} />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  User Profile
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
