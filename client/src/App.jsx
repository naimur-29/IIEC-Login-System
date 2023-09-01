import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./scss/app.scss";

// pages:
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Records from "./pages/Records";
import Error from "./pages/Error";

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

  {
    path: "*",
    element: <Error />,
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
