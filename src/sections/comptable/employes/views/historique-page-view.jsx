import React, { useState } from 'react';

import { Box, Table, Button, TableBody, Card, TableHead, TableRow, TableCell } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter } from 'src/utils/format-time';

import { historiqueData } from 'src/_mock/_historique';
import { ComptableContent } from 'src/layouts/comptable';

import { Iconify } from 'src/components/iconify';
import { useTable, TableNoData } from 'src/components/table';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import HistoriqueFiltersToolbar from '../historique-filters-toolbar';

export default function HistoriquePageView() {
  const table = useTable({ defaultOrderBy: 'date' });
  const router = useRouter();

  const [tableData, setTableData] = useState(historiqueData);

  const filters = useSetState({
    employe: 'all',
    entreprise: 'all',
    paie: 'all',
    startDate: null,
    endDate: null,
  });

  const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);

  console.log(dateError);

  const notFound = !tableData.length;

  return (
    <ComptableContent>
      <CustomBreadcrumbs
        heading="Historique des affiliations mutuelle"
        links={[{ name: 'Tableau de bord', href: paths.comptable.root }, { name: 'Historique' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
        action={
          <Button
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="material-symbols:download-rounded" />}
          >
            Exporter
          </Button>
        }
      />
      <Card sx={{ mb: 3 }}>
        <HistoriqueFiltersToolbar
          filters={filters}
          options={{
            employes: [{ value: 1, label: 'Employé 1' }],
            entreprise: [{ value: 1, label: 'Entreprise 1' }],
            paie: [{ value: 1, label: 'Paie 1' }],
          }}
          onResetPage={table.onResetPage}
          dateError={dateError}
        />
        <Box sx={{ position: 'relative' }}>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Employé</TableCell>
                <TableCell>Entreprise</TableCell>
                <TableCell>Paie</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Détails</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tableData.length ? (
                tableData.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{new Date(row.date).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>{row.employeName}</TableCell>
                    <TableCell>{row.entrepriseName}</TableCell>
                    <TableCell>{row.paie}</TableCell>
                    <TableCell>{row.action}</TableCell>
                    <TableCell>{row.details}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableNoData notFound={notFound} />
              )}
            </TableBody>
          </Table>
        </Box>
      </Card>
    </ComptableContent>
  );
}
