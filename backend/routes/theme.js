import express from 'express';
import Theme from '../models/Theme.js';

const themeRouter = express.Router();

// GET - Get the current theme or set a default
themeRouter.get('/', async (req, res) => {
    try {
      let theme = await Theme.findOne();
  
      // If no theme found, create a default one
      if (!theme) {
        theme = new Theme({
          name: 'Default',
          mode: 'light',
          accentColor: '#2196f3' // Default blue
        });
  
        await theme.save();
      }
  
      res.json(theme);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  });

// PUT /api/theme — Update or create theme
themeRouter.put('/', async (req, res) => {
  try {
    let theme = await Theme.findOne();
    
    if (theme) {
      // Update existing
      theme.name = req.body.name || theme.name;
      theme.mode = req.body.mode || theme.mode;
      theme.accentColor = req.body.accentColor || theme.accentColor;
    } else {
      // Create new
      theme = new Theme(req.body);
    }

    const savedTheme = await theme.save();
    res.json(savedTheme);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default themeRouter;
