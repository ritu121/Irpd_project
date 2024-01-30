import Sidebar from "./Navbar.js";
import Header from '../Layout/Header';

function RootLayout({ children }) {
  return (
    <div className="flex gap-1 h-fit">
      <Sidebar />
      <main className="flex-1 mx-auto pb-2">{children}</main>
    </div>
  );
}

export default RootLayout;