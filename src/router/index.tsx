import Film from "@/components/routes/Film/Film";
import Films from "@/components/routes/Films/Films";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom/dist/index";


export const router = createBrowserRouter([
  {
    path: "/films",
    element: <Films />,
  },
  {
    path: "/films/:id",
    element: <Film />,
  },
]);