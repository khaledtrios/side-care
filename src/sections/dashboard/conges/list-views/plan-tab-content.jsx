import React, { useMemo, useState } from 'react';

// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  Box,
  Tab,
  Tabs,
  Paper,
  Select,
  useTheme,
  MenuItem,
  Typography,
  IconButton,
  InputLabel,
  FormControl,
} from '@mui/material';

import { useTabs } from 'src/hooks/use-tabs';

import { Iconify } from 'src/components/iconify';

import PlanWeek from '../plan-week';
import PlanMonth from '../plan-month';

// Static employees data (would typically come from props/API)
const employees = [
  {
    id: 1,
    name: 'Ddccv Ffffddd',
    avatarColor: '#FDC21C',
    workedDays: 17,
    startDate: '2025-06-03',
    endDate: '2025-06-07',
    societe: 'Societe A',
  },
  {
    id: 2,
    name: 'Azaz Aaa',
    avatarColor: '#00BFFF',
    workedDays: 21,
    societe: 'Societe A',
  },
  {
    id: 3,
    name: 'Ffdd Cf',
    avatarColor: '#FDC21C',
    workedDays: 21,
    startDate: '2025-06-05',
    endDate: '2025-06-07',
    societe: 'Societe B',
  },
  {
    id: 4,
    name: 'Ffdd Cf',
    avatarColor: '#FDC21C',
    workedDays: 21,
    startDate: '2025-06-10',
    endDate: '2025-06-11',
    societe: 'Societe B',
  },
  {
    id: 4,
    name: 'Ffdd Cf',
    avatarColor: '#FDC21C',
    workedDays: 21,
    startDate: '2025-06-10',
    endDate: '2025-07-11',
    societe: 'Societe B',
  },
];

const TABS = [
  { value: 'month', label: 'Mois' },
  { value: 'week', label: 'Semaine' },
];

const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];
const formatWeekRange = (startDate) => {
  const start = new Date(startDate);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  
  const startDay = start.getDate();
  const endDay = end.getDate();
  const startMonth = MONTHS[start.getMonth()];
  const endMonth = MONTHS[end.getMonth()];
  const year = end.getFullYear();
  
  if (start.getMonth() === end.getMonth()) {
    return `${startDay} - ${endDay} ${startMonth} ${year}`;
  }
  return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`;
};

export default function PlanTabContent() {
  const tabs = useTabs('month');
  const theme = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1)); // June 2025 as initial

  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday start
    return new Date(today.setDate(diff));
  });

  const goToPreviousWeek = () => {
    setCurrentWeekStart(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 7);
      return newDate;
    });
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 7);
      return newDate;
    });
  };

  // Extract month/year from current date
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Generate years range (current year -5 to +5)
  const yearsRange = useMemo(() => {
    const currentYear2 = new Date().getFullYear();
    return Array.from({ length: 11 }, (_, i) => currentYear2 - 5 + i);
  }, []);

  // Navigation handlers
  const goToPreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Date change handlers
  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    setCurrentDate(prev => new Date(prev.getFullYear(), newMonth, 1));
  };

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setCurrentDate(prev => new Date(newYear, prev.getMonth(), 1));
  };

  return (
    <Paper>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} p={2}>
       
          <Typography variant="h5" sx={{ mr: 3 }}>
            Planning
          </Typography>
          
          {/* Date Navigation Controls */}
          {tabs.value === "month" && (
            <Box display="flex" alignItems="center">
            <IconButton onClick={goToPreviousMonth} size="small">
              <Iconify icon="material-symbols:chevron-left-rounded" fontSize="small" />
            </IconButton>
            
            <Box sx={{ mx: 2, display: 'flex', gap: 1 }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Mois</InputLabel>
                <Select
                  value={currentMonth}
                  onChange={handleMonthChange}
                  label="Mois"
                >
                  {MONTHS.map((month, index) => (
                    <MenuItem key={month} value={index}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Année</InputLabel>
                <Select
                  value={currentYear}
                  onChange={handleYearChange}
                  label="Année"
                >
                  {yearsRange.map(year => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            
            <IconButton onClick={goToNextMonth} size="small">
              <Iconify icon="material-symbols:chevron-right-rounded" fontSize="small" />
            </IconButton>
          </Box>
          )}

          {tabs.value === "week" && (
             <Box display="flex" alignItems="center">
            <IconButton onClick={goToPreviousWeek} size="small">
              <Iconify icon="material-symbols:chevron-left-rounded" fontSize="small" />
            </IconButton>
            <Typography variant="body1" sx={{ mx: 2, fontWeight: 'medium' }}>
                {formatWeekRange(currentWeekStart)}
              </Typography>
            <IconButton onClick={goToNextWeek} size="small">
              <Iconify icon="material-symbols:chevron-right-rounded" fontSize="small" />
            </IconButton>
            </Box>
          )}
        

        {/* View Tabs */}
        <Tabs
          value={tabs.value}
          onChange={tabs.onChange}
          sx={{
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          {TABS.map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>
      </Box>

      {tabs.value === 'month' ? (
        <PlanMonth 
          employees={employees} 
          month={currentMonth}
          year={currentYear}
        />
      ) : (
        <PlanWeek 
          employees={employees} 
          startDate={currentWeekStart}
        />
      )}
    </Paper>
  );
}