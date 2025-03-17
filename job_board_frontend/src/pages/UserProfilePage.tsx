import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Navigate } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { AuthUser } from "../type/User";

const UserProfilePage = () => {
  const auth = useAuthUser<AuthUser>();
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!auth) {
    return <p>Loading profile data...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">My Profile</h2>

      <div className="bg-white rounded-lg shadow-md p-6 flex items-start">
        <div className="h-16 w-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-semibold mr-6">
          {auth.name.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="mb-4">
            <span className="block text-gray-500 text-sm">Name</span>
            <span className="text-gray-800">{auth.name}</span>
          </div>
          <div className="mb-4">
            <span className="block text-gray-500 text-sm">Email</span>
            <span className="text-gray-800">{auth.email}</span>
          </div>
          <div>
            <span className="block text-gray-500 text-sm">Role</span>
            <span className=" text-gray-800 text-sm">{auth.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
