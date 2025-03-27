import { useState, useEffect } from "react";
import Card from "../components/Card";

function Settings() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "retro");
  const [unit, setUnit] = useState(localStorage.getItem("unit") || "lbs");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const saveSettings = () => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("unit", unit);
    window.location.reload();
  };

  return (
    <Card className="settings-inner">
      <h2>Settings</h2>

      <div className="dropdown-row">
        <div className="form-group">
          <h3>Theme</h3>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="retro">Retro Theme</option>
            <option value="light">Light Mode</option>
            <option value="dark">Dark Mode</option>
          </select>
        </div>

        <div className="form-group">
          <h3>Unit Preference</h3>
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="lbs">Pounds (lbs)</option>
            <option value="kg">Kilograms (kg)</option>
          </select>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <button className="btn" onClick={saveSettings}>Save Settings</button>
      </div>
    </Card>
  );
}

export default Settings;
