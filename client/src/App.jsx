import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./scss/app.scss";

// pages:
import Dashboard from "./pages/dashboard";
import Register from "./pages/register";
import Records from "./pages/records";

// router:
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/records",
    element: <Records />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
