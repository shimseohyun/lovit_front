import { createBrowserRouter } from "react-router-dom";

import ServiceRoute from "./ServiceRoute";

import EvaluationPage from "@pagesV02/evaluation/EvaluationPage";
import HomePage from "@pagesV02/home/HomePage";
import ResultPage from "@pagesV02/result/ResultPage";

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
