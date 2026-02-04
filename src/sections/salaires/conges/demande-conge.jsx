import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
// ---- NEW IMPORTS ----
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import frLocale from '@fullcalendar/core/locales/fr';

import Grid from '@mui/material/Unstable_Grid2';
import { Box, Card, Paper, Stack, Button, Typography, useMediaQuery } from '@mui/material';

import { useSetState } from 'src/hooks/use-set-state';

import { fakeConges } from 'src/_mock/_conges';

import { Label } from 'src/components/label';
import { Scrollbar } from 'src/components/scrollbar';
import { useTable, getComparator } from 'src/components/table';

import CongeList from 'src/sections/dashboard/conges/conge-list';
import CongeDetails from 'src/sections/dashboard/conges/conge-details';

import DemandeFiltersSection from './demande-filters-section';

export default function DemandeConge() {
  const [demandeConge, setDemandeConge] = useState([]);
  const [selectedConge, setSelectedConge] = useState(null);

  const table = useTable({ defaultOrderBy: 'startDate' });

  const [showDetailsMobile, setShowDetailsMobile] = useState(false);

  const filters = useSetState({
    period: 'all',
    status: 'all',
  });
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const filteredData = applyFilter({
    inputData: fakeConges,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });

  const handleSelectConge = (conge) => {
    setSelectedConge(conge);
    if (isMobile) setShowDetailsMobile(true);
  };

  const handleBackToList = () => {
    setShowDetailsMobile(false);
  };

  // ---- Map congés to FullCalendar events ----
  const calendarEvents = fakeConges.map((conge) => ({
    id: conge.id,
    title: conge.title || `${conge.employe?.name} - ${conge.status}`,
    start: conge.startDate,
    end: conge.endDate,
    color:
      conge.status === 'approved' ? '#4caf50' : conge.status === 'pending' ? '#ff9800' : '#f44336',
  }));

  return (
    <Card>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Mes Demandes <Label color="primary">{demandeConge.length}</Label>
        </Typography>
        <DemandeFiltersSection filters={filters} />
        {isMobile ? (
          showDetailsMobile && selectedConge ? (
            <>
              <Button onClick={handleBackToList} sx={{ mb: 2 }}>
                ← Retour à la liste
              </Button>
              <CongeDetails conge={selectedConge} />
            </>
          ) : (
            <CongeList
              list={filteredData}
              onSelect={handleSelectConge}
              selectedId={selectedConge?.id}
            />
          )
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Liste des Congés
                </Typography>
                <Scrollbar
                  sx={{
                    height: 320,
                  }}
                >
                  <CongeList
                    list={filteredData}
                    onSelect={handleSelectConge}
                    selectedId={selectedConge?.id}
                  />
                </Scrollbar>
              </Paper>
            </Grid>
            <Grid item xs={12} md={7}>
              <Paper sx={{ p: 2, minHeight: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Détails du Congé
                </Typography>
                {selectedConge ? (
                  <CongeDetails conge={selectedConge} />
                ) : (
                  <Typography color="text.secondary">
                    Sélectionnez un congé à gauche pour afficher les détails.
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>

      {/* ---- New Calendar Section ---- */}

      <Box sx={{ p: 3 }} >
        <Typography variant="h6" gutterBottom>
          Mon compteur de congés
        </Typography>
        <Typography variant="body2" padding={2}>
          Solde des jours disponibles à la fin du mois (décomptant les absences posées futures). Ces
          données sont fournies à titre indicatif. Demandez à votre responsable RH de les remplir
          afin d&apos;avoir accès à votre solde de congés payés.
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2, backgroundColor: '#f9f3c1', }}
        >
          <Typography variant="body2">Solde de congés payés : 5 jours</Typography>
          <Typography variant="body2">Solde de RTT : 10 jours</Typography>
        </Stack>
      </Box>

      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Planning des Congés
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
    </Card>
  );
}

function applyFilter({ inputData, comparator, filters }) {
  const { status, period } = filters;

  // Sorting
  const stabilizedThis = inputData.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  inputData = stabilizedThis.map((el) => el[0]);

  // Filter by status
  if (status !== 'all') {
    inputData = inputData.filter((conge) => conge.status === status);
  }

  // Filter by period (startDate within selected month)
  if (period !== 'all') {
    const start = dayjs(period).startOf('month');
    const end = dayjs(period).endOf('month');

    inputData = inputData.filter((conge) => {
      const date = dayjs(conge.startDate);
      return date.isSame(start, 'month');
    });
  }

  return inputData;
}
