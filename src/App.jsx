import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";
import Home from "./components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="flex flex-col items-center">
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/pastes",
    element: (
      <div className="flex flex-col items-center">
        <Navbar />
        <Paste />
      </div>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <div className="flex flex-col items-center">
        <Navbar />
        <ViewPaste />
      </div>
    ),
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return <RouterProvider router={router} />;
}

export default App;
