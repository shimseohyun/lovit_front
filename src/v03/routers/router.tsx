import { createBrowserRouter } from "react-router-dom";

import ServiceRoute from "./ServiceRoute";

import EvaluationPage from "@pagesV03/evaluation/EvaluationPage";
import HomePage from "@pagesV03/home/HomePage";
import ResultPage from "@pagesV03/result/ResultPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ServiceRoute />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/evaluate", element: <EvaluationPage /> },
      { path: "/result", element: <ResultPage /> },
    ],
  },
]);

export default router;
