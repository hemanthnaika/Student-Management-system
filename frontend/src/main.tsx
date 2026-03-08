import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Login from "./pages/login";
import ProtectedRoute from "./components/protectedRoute";
import Sidebar from "./layout/sidebar";
import Home from "./pages/home";
import Students from "./pages/studentList";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Sidebar />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
           {
            path: "/students",
            element: <Students />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
