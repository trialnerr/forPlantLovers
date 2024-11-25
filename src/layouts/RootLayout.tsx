import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function RootLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

// This codebase uses components from Flowbite
// Copyright (c) 2023 Bergside Inc.
// Licensed under the MIT License: https://github.com/themesberg/flowbite/blob/main/LICENSE.md