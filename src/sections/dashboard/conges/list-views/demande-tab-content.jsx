import dayjs from 'dayjs';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import { Paper, Button, Typography, useMediaQuery } from '@mui/material';

import { useSetState } from 'src/hooks/use-set-state';

import { fakeConges } from 'src/_mock/_conges';

import { Scrollbar } from 'src/components/scrollbar';
import { useTable, getComparator } from 'src/components/table';

import CongeList from '../conge-list';
import CongeDetails from '../conge-details';
import CongeListFilters from '../conge-list-filters';

export default function DemandeTabContent() {
  const [selectedConge, setSelectedConge] = useState(null);
  const [showDetailsMobile, setShowDetailsMobile] = useState(false);

  const table = useTable({ defaultOrderBy: 'startDate' });
  const filters = useSetState({
    companies: [],
    status: 'all',
    period: null,
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

  return (
    <Box sx={{ p: 2 }}>
      <CongeListFilters
        filters={filters}
        onResetPage={table.onResetPage}
        options={{
          companies: [...new Set(fakeConges.map((c) => c.entreprise.name))],
          status: [
            { value: 'all', label: 'Tous les demandes' },
            { value: 'not justified', label: 'Demandes non justifiées' },
            { value: 'justified', label: 'Demandes justifiées' },
          ],
        }}
      />

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
  );
}

function applyFilter({ inputData, comparator, filters }) {
  const { status, companies, period } = filters;

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

  // Filter by entreprise name
  if (companies.length) {
    inputData = inputData.filter((conge) => companies.includes(conge.entreprise.name));
  }

  // Filter by period (startDate within selected month)
  if (period) {
    const start = dayjs(period).startOf('month');
    const end = dayjs(period).endOf('month');

    inputData = inputData.filter((conge) => {
      const date = dayjs(conge.startDate);
      return date.isSame(start, 'month');
    });
  }

  return inputData;
}
