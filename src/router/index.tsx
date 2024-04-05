import MainView from "@/components/MainView";
import Film from "@/components/routes/Film/Film";
import Films from "@/components/routes/Films/Films";
import { useEffect } from "react";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, useNavigate } from "react-router-dom/dist/index";

// function NavigateToFilms() {
//   const navigate = useNavigate();
//   useEffect(() => {
//     navigate('/films');
//   }, [navigate]);

//   return <MainView />
// }

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainView />, // MainView as the layout for all routes
    children: [
      {
        index: true,
        element: <Navigate to="/films" replace /> 
      },
      {
        path: "films",
        element: <Films />, 
      },
      {
        path: "films/:id",
        element: <Film />, 
      },
    ]
  }
]);