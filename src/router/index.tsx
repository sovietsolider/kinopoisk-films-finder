import NotFound from "@/components/common/NotFound/NotFound";
import MainView from "@/components/MainView";
import Film from "@/components/routes/Film/Film";
import { Films } from "@/components/routes/Films/Films";
import RandomFilm from "@/components/routes/RandomFilm/RandomFilm";
import { storedIsAuth } from "@/store";
import { useEffect } from "react";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, useNavigate } from "react-router-dom/dist/index";
import { useRecoilState } from "recoil";
import ProtectedRoute from "./ProtectedRoute";

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
      {
        path: "random",
        element: (
          <ProtectedRoute>
            <RandomFilm />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ]
  }
]);