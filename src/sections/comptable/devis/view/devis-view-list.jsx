import React, { useState } from 'react';

import { Button } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useSetState } from 'src/hooks/use-set-state';

import { ComptableContent } from 'src/layouts/comptable';

import { Iconify } from 'src/components/iconify';
import { useTable, getComparator } from 'src/components/table';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import DevisTableToolbar from '../devis-table-toolbar';

const TABLE_HEAD = [
    { id: 'devis', label: 'Devis' },
    { id: 'Entreprise', label: 'Entreprise'}
]

export default function DevisViewList() {
  const table = useTable({ defaultOrderBy: 'date' });

  const [tableData, setTableData] = useState([]);

  const filters = useSetState({
    cabinet: 'all',
    entreprise: 'all',
    paie: 'all',
  });

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });

  const canReset =
    filters.state.entreprise !== 'all' ||
    filters.state.cabinet !== 'all' ||
    filters.state.paie !== 'all';

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  return (
    <ComptableContent>
      <CustomBreadcrumbs
        heading="Devis"
        links={[{ name: 'Tableau de bord', href: paths.comptable.root }, { name: 'Devis' }]}
        action={
          <Button
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="material-symbols:add-rounded" />}
          >
            Faire un devis
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <DevisTableToolbar
        filters={filters}
        onResetPage={table.onResetPage}
        options={{
          cabinet: [{ value: 1, label: 'Cabinet 1' }],
          entreprise: [{ value: 1, label: 'Entreprise 1' }],
          paie: [{ value: 1, label: 'Paie 1' }],
        }}
      />
    </ComptableContent>
  );
}

function applyFilter({ inputData, comparator, filters }) {
  const { entreprise, cabinet, paie } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (entreprise !== 'all') {
    inputData = inputData.filter((item) => item.entreprise === entreprise);
  }

  if (cabinet !== 'all') {
    inputData = inputData.filter((item) => item.cabinet === cabinet);
  }

  if (paie !== 'all') {
    inputData = inputData.filter((item) => item.paie === paie);
  }

  return inputData;
}
