import { Outlet } from "react-router-dom";
import Navbar from "./Components/navbar";
import { Box } from "@chakra-ui/react";

export function Layout() {
  return (
    <>
      <Navbar />
      <Box paddingTop={20}>
        <main>
          <Outlet />
        </main>
      </Box>
    </>
  );
}
