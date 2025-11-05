import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import frLocale from '@fullcalendar/core/locales/fr';

import { Box, Paper, Typography } from '@mui/material';

// ✅ Example events
const calendarEvents = [
  {
    id: 1,
    title: 'Congé payé - Wissem',
    start: '2025-08-23',
    end: '2025-08-25',
    color: '#4caf50', // green
  },
  {
    id: 2,
    title: 'RTT - Aymen',
    start: '2025-08-27',
    color: '#2196f3', // blue
  },
  {
    id: 3,
    title: 'Congé maladie - Sarah',
    start: '2025-08-28',
    end: '2025-08-30',
    color: '#f44336', // red
  },
];

export default function PlanningPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Planning
      </Typography>
      <Paper sx={{ p: 2 }}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          locale={frLocale}
          height="auto"
          events={calendarEvents}
        />
      </Paper>
    </Box>
  );
}
