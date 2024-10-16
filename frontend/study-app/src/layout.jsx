import { Outlet } from "react-router-dom";
import Navbar from "./Components/navbar";

export function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
