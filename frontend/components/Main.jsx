import { Outlet } from "react-router-dom";
import Header from "./Header";
import NavBar from "./NavBar";

function Main() {
  return (
    <>
      <NavBar />
      <div className="app-container">
        <div className="content-scroll-container">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}


export default Main;
