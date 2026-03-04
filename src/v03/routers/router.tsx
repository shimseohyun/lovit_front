import { createBrowserRouter, Navigate } from "react-router-dom";

import ServiceRoute from "./ServiceRoute";

import EvaluationPage from "@pagesV03/evaluation/EvaluationPage";
import HomePage from "@pagesV03/home/HomePage";
import ResultPage from "@pagesV03/result/ResultPage";
import SelectePage from "@pagesV03/select/SelectPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ServiceRoute />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "select/:boardID", element: <SelectePage /> },
      { path: "evaluate/:boardID", element: <EvaluationPage /> },
      { path: "evaluate/:boardID/:groupID", element: <EvaluationPage /> },
      { path: "result/:boardID", element: <ResultPage /> },
      { path: "result/:boardID/:groupID", element: <ResultPage /> },

      { path: "share/*", element: <Navigate to="/" replace /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default router;
