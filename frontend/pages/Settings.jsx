import { useState } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

function Settings() {
  const [mode, setMode] = useState('light');
  const [accentColor, setAccentColor] = useState('#2196f3'); // default blue
  const [unit, setUnit] = useState('lbs');

  const handleSave = (e) => {
    e.preventDefault();
    const themeSettings = {
      mode,
      accentColor,
      unit
    };
    console.log('Saved settings:', themeSettings);
  };

  return (
    <div>
      <h2>Settings</h2>

      <form onSubmit={handleSave}>
        <Card>
          <h3>Theme</h3>

          <label>
            <input
              type="radio"
              name="mode"
              value="light"
              checked={mode === 'light'}
              onChange={() => setMode('light')}
            />
            Light Mode
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              value="dark"
              checked={mode === 'dark'}
              onChange={() => setMode('dark')}
            />
            Dark Mode
          </label>

          <Input
            label="Accent Color"
            type="color"
            value={accentColor}
            onChange={(e) => setAccentColor(e.target.value)}
          />
        </Card>

        <Card>
          <h3>Unit Preference</h3>
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="lbs">Pounds (lbs)</option>
            <option value="kg">Kilograms (kg)</option>
          </select>
        </Card>

        <Button type="submit" name="Save Settings" />
      </form>
    </div>
  );
}

export default Settings;