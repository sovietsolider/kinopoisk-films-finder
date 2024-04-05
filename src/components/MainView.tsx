import { Outlet } from "react-router-dom/dist/index";
import Navbar from "./common/navbar/Navbar";

export default function MainView() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}