import React, { useState } from 'react';

import { Box, Table, Button, TableBody, Card } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter } from 'src/utils/format-time';

import { ComptableContent } from 'src/layouts/comptable';

import { Iconify } from 'src/components/iconify';
import { useTable, TableNoData } from 'src/components/table';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import HistoriqueFiltersToolbar from '../historique-filters-toolbar';

export default function HistoriquePageView() {
  const table = useTable({ defaultOrderBy: 'date' });
  const router = useRouter();

  const [tableData, setTableData] = useState([]);

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
            <TableBody>
              <TableNoData notFound={notFound} />
            </TableBody>
          </Table>
        </Box>
      </Card>
    </ComptableContent>
  );
}
