const db = require('../config/db');

const Calendar = {
  getAllEvents: async () => {
    const [rows] = await db.query('SELECT * FROM academic_calendar ORDER BY start_date');
    return rows;
  }
};

module.exports = Calendar;