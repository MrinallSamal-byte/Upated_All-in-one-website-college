const Calendar = require('../models/calendar');

exports.getCalendarEvents = async (req, res) => {
  try {
    const events = await Calendar.getAllEvents();
    res.json(events);
  } catch (err) {
    console.error('Error fetching calendar events:', err);
    res.status(500).json({ error: 'Server error' });
  }
};