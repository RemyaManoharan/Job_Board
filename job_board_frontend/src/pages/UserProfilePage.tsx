import React, { useState } from "react";
// import { useQuery } from 'react-query';
// import { fetchCurrentUser } from '../api/auth';
const UserProfilePage = () => {
  const mockUser = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "user",
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState(mockUser);

  //   const { data: user, isLoading, error } = useQuery({
  //     queryKey: ["currentUser"],
  //     queryFn: fetchCurrentUser,
  //   });

  //   if (isLoading) return <p>Loading...</p>;
  //   if (error) return <p>Error fetching user data</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">My Profile</h2>
      {user && (
        <div className="bg-white rounded-lg shadow-md p-6 flex items-start">
          <div className="h-16 w-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-semibold mr-6">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="mb-4">
              <span className="block text-gray-500 text-sm">Name</span>
              <span className="text-gray-800">{user.name}</span>
            </div>
            <div className="mb-4">
              <span className="block text-gray-500 text-sm">Email</span>
              <span className="text-gray-800">{user.email}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-sm">Role</span>
              <span className=" text-gray-800 text-sm">{user.role}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
