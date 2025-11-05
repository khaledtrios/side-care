import React from 'react';

import {
  Box,
  List,
  Divider,
  ListItem,
  Checkbox,
  Accordion,
  Typography,
  ListItemText,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

export default function DemarchEmployesList({ handleOld, show, data = [], setSelected }) {
  const handleClick = (employee) => {
    setSelected(employee)
  };

  const withTasks = data.filter((emp) => emp.tasks?.length > 0);
  const withoutTasks = data.filter((emp) => !emp.tasks || emp.tasks.length === 0);

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Les employés
      </Typography>

      <Scrollbar sx={{ p: 2, maxHeight: 600 }}>
        <FormControlLabel
          control={<Checkbox checked={show} onClick={handleOld} />}
          label="Afficher les anciens collaborateurs"
          sx={{ mb: 2 }}
        />

        {/* Section: With Tasks */}
        <Accordion defaultExpanded sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<Iconify icon="lucide:chevron-up" />}>
            <Typography fontWeight="bold">
              Employés avec tâches ({withTasks.length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense disablePadding>
              {withTasks.map((emp, idx) => (
                <ListItem
                  key={`with-${idx}`}
                  button
                  onClick={() => handleClick(emp)}
                >
                  <ListItemText
                    primary={emp.name}
                    secondary={emp.company}
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        <Divider sx={{ my: 2 }} />

        {/* Section: Without Tasks */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<Iconify icon="lucide:chevron-up" />}>
            <Typography fontWeight="bold">
              Employés sans tâches ({withoutTasks.length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense disablePadding>
              {withoutTasks.map((emp, idx) => (
                <ListItem
                  key={`without-${idx}`}
                  button
                  onClick={() => handleClick(emp)}
                >
                  <ListItemText
                    primary={emp.name}
                    secondary={emp.company}
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </Scrollbar>
    </Box>
  );
}
