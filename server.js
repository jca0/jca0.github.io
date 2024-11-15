// server.js
const express = require('express');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Add at the top
const path = require('path');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route to handle client-side routing
app.get('/calendar/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'calendar.html'));
});


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/online-calendar', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Event Schema
const eventSchema = new mongoose.Schema({
  calendarId: String,
  title: String,
  description: String,
  startTime: Date,
  endTime: Date,
});

const Event = mongoose.model('Event', eventSchema);

// Route to create a new calendar
app.post('/api/create-calendar', (req, res) => {
  const calendarId = uuidv4();
  res.send({ calendarId, link: `http://localhost:3000/calendar/${calendarId}` });
});

// Route to get events for a calendar
app.get('/api/calendar/:id/events', async (req, res) => {
  const events = await Event.find({ calendarId: req.params.id });
  res.send(events);
});

// Route to add a new event
app.post('/api/calendar/:id/events', async (req, res) => {
  const event = new Event({ calendarId: req.params.id, ...req.body });
  await event.save();
  res.send(event);
});

// Route to delete an event
app.delete('/api/calendar/:id/events/:eventId', async (req, res) => {
  await Event.deleteOne({ _id: req.params.eventId });
  res.send({ success: true });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
