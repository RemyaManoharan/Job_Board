import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray">
      <Header />
      <main className="flex-1 p-4 container mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
