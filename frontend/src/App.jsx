import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { router } from "./routes/Routes.jsx";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <React.Fragment>
      <Toaster position="top-right" />
      <div>
        <RouterProvider router={router} />
      </div>
    </React.Fragment>
  );
}

export default App;
