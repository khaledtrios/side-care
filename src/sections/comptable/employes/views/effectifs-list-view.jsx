import React, { useState } from 'react';

import { Box, Stack, Table, Button, Tooltip, TableBody, IconButton } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useSetState } from 'src/hooks/use-set-state';

import { today } from 'src/utils/format-time';

import { ComptableContent } from 'src/layouts/comptable';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
} from 'src/components/table';

import EffectifsToolbar from '../effectifs-toolbar';
import EffectifsTableRow from '../effectifs-table-row';
import EffectifsFilterResults from '../effectifs-filter-results';

const TABLE_HEAD = [
  { id: 'name', label: 'Employé' },
  { id: 'type', label: 'Type de contrat' },
  { id: 'college', label: 'Collège' },
  { id: 'contract_start', label: 'Début de contrat' },
  { id: 'contract_end', label: 'Fin de contrat' },
];

const data = [
  {
    id: 1,
    name: 'Alice Dupont',
    type: 'CDI',
    college: 'Cadre',
    contract_start: today(),
    contract_end: today(),
    entreprise: 'Entreprise 1',
    actif: 'actual',
  },
  {
    id: 2,
    name: 'Bob Martin',
    type: 'CDD',
    college: 'Employé',
    contract_start: today(),
    contract_end: today(),
    entreprise: 'Entreprise 2',
    actif: 'former',
  },
  {
    id: 3,
    name: 'Claire Dubois',
    type: 'Stage',
    college: 'Stagiaire',
    contract_start: today(),
    contract_end: today(),
    entreprise: 'Entreprise 3',
    actif: 'actual',
  },
];

export default function EffectifsListView() {
  const table = useTable({ defaultOrderBy: 'date' });

  const router = useRouter();

  const [tableData, setTableData] = useState(data);

  const filters = useSetState({
    entreprise: 'all',
    name: '',
    actif: 'all',
    college: 'all',
    type: 'all',
  });

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });

  console.log(dataFiltered);

  const canReset =
    filters.state.entreprise !== 'all' ||
    !!filters.state.name ||
    filters.state.actif !== 'all' ||
    filters.state.college !== 'all' ||
    filters.state.type !== 'all';

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  console.log(tableData);

  return (
    <ComptableContent>
      <CustomBreadcrumbs
        heading="Effectifs"
        links={[{ name: 'Tableau de bord', href: paths.comptable.root }, { name: 'Effectifs' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
        action={
          <Stack direction="row" spacing={1}>
            <Button
              href={paths.comptable.employes.add}
              LinkComponent={RouterLink}
              variant="contained"
              color="primary"
            >
              Ajouter un employé
            </Button>
            <Tooltip title="Exporter">
              <IconButton variant="outlined" color="primary">
                <Iconify icon="eva:download-fill" />
              </IconButton>
            </Tooltip>
          </Stack>
        }
      />

      <EffectifsToolbar
        filters={filters}
        onResetPage={table.onResetPage}
        options={{
          entrepriseList: [
            { value: 'Entreprise 1', label: 'Entreprise 1' },
            { value: 'Entreprise 2', label: 'Entreprise 2' },
            { value: 'Entreprise 3', label: 'Entreprise 3' },
          ],
        }}
      />

      {canReset && <EffectifsFilterResults filters={filters} totalResults={dataFiltered.length} />}

      <Box sx={{ position: 'relative' }}>
        <TableSelectedAction
          dense={table.dense}
          numSelected={table.selected.length}
          rowCount={dataFiltered.length}
        />

        <Scrollbar sx={{ minHeight: 444 }}>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              rowCount={dataFiltered.length}
              numSelected={table.selected.length}
              onSort={table.onSort}
            />

            <TableBody>
              {dataFiltered
                .slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                )
                .map((row) => (
                  <EffectifsTableRow
                    row={row}
                    onSelectRow={() => router.push(paths.comptable.employes.view(row.id))}
                  />
                ))}

              <TableEmptyRows
                height={table.dense ? 56 : 56 + 20}
                emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
              />

              <TableNoData notFound={notFound} />
            </TableBody>
          </Table>
        </Scrollbar>
      </Box>
    </ComptableContent>
  );
}

function applyFilter({ inputData, comparator, filters }) {
  const { entreprise, name, actif, college, type } = filters;

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
  if (name) {
    inputData = inputData.filter(
      (item) => item.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (actif !== 'all') {
    inputData = inputData.filter((item) => item.actif === actif);
  }

  if (college !== 'all') {
    inputData = inputData.filter((item) => item.college === college);
  }

  if (type !== 'all') {
    inputData = inputData.filter((item) => item.type === type);
  }

  console.log(inputData);
  return inputData;
}
