import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { ErrorPage } from "./error-page.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import Main from "./pages/Main.tsx";
import Identify from "./pages/Identify.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import { AuthProvider } from "./context/authProvider.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Gallery from "./pages/Gallery.tsx";
import PlantCarePage from "./pages/PlantCarePage.tsx";
import NotFound from "./pages/NotFound.tsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Main />,
        },
        {
          path: "/identify",
          element: (
            <ProtectedRoute>
              <Identify />
            </ProtectedRoute>
          ),
        },
        {
          path: "/gallery",
          element: (
            <ProtectedRoute>
              <Gallery />
            </ProtectedRoute>
          ),
        },
        {
          path: "/care/:plantId",
          element: (
            <ProtectedRoute>
              <PlantCarePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/login",
          element: <SignInPage />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <>
    <AuthProvider>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </AuthProvider>
  </>,
  // </StrictMode>,
);
