import { Outlet } from "react-router-dom";
import Header from "./Header";
import NavBar from "./NavBar";

function Main() {
  return (
    <div className="app-container" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <Header />
      
      <main style={{ flex: 1 }}>
        <Outlet /> {/* This renders your current page */}
      </main>

      <NavBar />
    </div>
  );
}

export default Main;
