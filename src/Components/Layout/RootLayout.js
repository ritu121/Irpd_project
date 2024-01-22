import Sidebar from "./Navbar.js";

function RootLayout({ children }) {
  return (
    <div className="flex gap-1">
      <Sidebar />
      <main className="max-w-7xl flex-1 mx-auto pb-2 mr-2">{children}</main>
    </div>
  );
}

export default RootLayout;