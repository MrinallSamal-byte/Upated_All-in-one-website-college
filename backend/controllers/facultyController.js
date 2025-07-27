const Faculty = require('../models/faculty');

exports.getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.getAll();
    res.json(faculty);
  } catch (err) {
    console.error('Error fetching faculty:', err);
    res.status(500).json({ error: 'Server error' });
  }
};