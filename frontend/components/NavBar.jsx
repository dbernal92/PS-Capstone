import { NavLink } from "react-router-dom";
import './NavBar.css';

function NavBar() {
  return (
    <nav className="top-nav">
      <ul style={{ display: "flex", gap: "1rem", listStyle: "none", padding: 0 }}>
        <li>
          <NavLink to="/" end>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/workouts">Workout Log</NavLink>
        </li>
        <li>
          <NavLink to="/progress">Progress</NavLink>
        </li>
        <li>
          <NavLink to="/notes">Notes</NavLink>
        </li>
        <li>
          <NavLink to="/settings">Settings</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;