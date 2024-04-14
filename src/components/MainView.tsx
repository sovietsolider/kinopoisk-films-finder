import { Outlet } from "react-router-dom/dist/index";
import Navbar from "./common/Navbar/Navbar";
import './MainView.scss'

export default function MainView() {
  return (
    <div className="main-view m-auto">
      <Navbar />
      <Outlet />
    </div>
  )
}