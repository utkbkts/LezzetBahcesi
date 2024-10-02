import React from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { router } from "./routes/Routes.jsx";

function App() {
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
