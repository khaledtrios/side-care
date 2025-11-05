import React, { useState } from 'react';

import {
  Box,
  Tab,
  Card,
  Tabs,
  List,
  Select,
  Button,
  Divider,
  Popover,
  MenuItem,
  Typography,
  ListItemText,
  ListItemButton,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';

function TabPanel({ children, value, index }) {
  return value === index ? <Box p={3}>{children}</Box> : null;
}

const months = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];
const years = ['2023', '2024', '2025'];

function TitresHeader() {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickAdd = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box mb={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
        <Typography variant="h6">Titres de transport</Typography>
        <Box display="flex" gap={2} alignItems="center">
          <Select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            size="small"
          >
            {years.map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            startIcon={<Iconify icon="ic:round-plus" />}
            onClick={handleClickAdd}
          >
            Ajouter
          </Button>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <List sx={{ minWidth: 250 }}>
              <ListItemButton onClick={() => { handleClosePopover(); /* Handle recurrent logic here */ }}>
                <ListItemText primary="Titre de transport récurrent" />
              </ListItemButton>
              <ListItemButton onClick={() => { handleClosePopover(); /* Handle ponctuel logic here */ }}>
                <ListItemText primary="Titre de transport ponctuel" />
              </ListItemButton>
            </List>
          </Popover>
        </Box>
      </Box>
    </Box>
  );
}

function DefaultHeader({ title }) {
  const [month, setMonth] = useState(new Date().getMonth().toString());
  const [year, setYear] = useState(new Date().getFullYear().toString());

  return (
    <Box mb={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
        <Typography variant="h6">{title}</Typography>
        <Box display="flex" gap={2} alignItems="center">
          <Select value={month} onChange={(e) => setMonth(e.target.value)} size="small">
            {months.map((label, index) => (
              <MenuItem key={index} value={index.toString()}>
                {label}
              </MenuItem>
            ))}
          </Select>
          <Select value={year} onChange={(e) => setYear(e.target.value)} size="small">
            {years.map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </Select>
          <Button variant="contained" startIcon={<Iconify icon="ic:round-plus" />}>
            Ajouter
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export function EvpTab() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Card>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        sx={{ px: 2 }}
      >
        <Tab label="Titres de transport" />
        <Tab label="Notes de frais" />
        <Tab label="Primes" />
      </Tabs>
      <Divider />

      <TabPanel value={tabIndex} index={0}>
        <TitresHeader />
        <EmptyContent description="Aucun titre de transport sur la période sélectionnée" />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <DefaultHeader title="Notes de frais" />
        <EmptyContent description="Aucune note de frais saisie sur la période sélectionée." />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <DefaultHeader title="Primes" />
        <EmptyContent description="Aucune prime sur la période sélectionnée" />
      </TabPanel>
    </Card>
  );
}
