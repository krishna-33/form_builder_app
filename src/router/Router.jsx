import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/Error";
import FormList from "../pages/Form/FormList";
import CreateForm from "../pages/Form/CreateForm";
import DisplayForm from "../pages/Form/DisplayForm";
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <FormList />,
  },
  {
    path: "/new",
    element: <CreateForm />,
  },
  {
    path: "/:id",
    element: <DisplayForm />,
  },
]);

export default router;
