import EvaluationPage from "@pagesV02/evaluation/EvaluationPage";
import HomePage from "@pagesV02/home/HomePage";
import ResultPage from "@pagesV02/result/ResultPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/evaluate", element: <EvaluationPage /> },
  { path: "/result", element: <ResultPage /> },
]);

export default router;
