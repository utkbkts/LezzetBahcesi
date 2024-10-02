import React from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { useGetUserQuery } from "./redux/api/UserApi.jsx";
import { router } from "./routes/Routes.jsx";

function App() {
  const { data } = useGetUserQuery();
  console.log("🚀 ~ App ~ data:", data);

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
