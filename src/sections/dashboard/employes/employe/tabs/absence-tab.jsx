import { toast } from 'sonner';
import React, { useState, useCallback } from 'react';

import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Button,
  TableBody,
  Typography,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { varAlpha } from 'src/theme/styles';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';

import AbsenceListRow from '../components/absence-list-row';

const initialAbsences = [
  {
    id: 1,
    startDate: '2025-07-01T00:00:00Z',
    endDate: '2025-07-03T00:00:00Z',
    raison: 'Congé maladie',
    status: 'pending',
  },
  {
    id: 2,
    startDate: '2025-07-10T00:00:00Z',
    endDate: '2025-07-15T00:00:00Z',
    raison: 'Vacances',
    status: 'approved',
  },
  {
    id: 3,
    startDate: '2025-06-20T00:00:00Z',
    endDate: '2025-06-22T00:00:00Z',
    raison: 'Urgence familiale',
    status: 'approved',
  },
  {
    id: 4,
    startDate: '2025-08-05T00:00:00Z',
    endDate: '2025-08-07T00:00:00Z',
    raison: 'Formation externe',
    status: 'pending',
  },
];

const TABLE_HEAD = [
  { id: 'raison', label: 'Name' },
  { id: 'period', label: 'Période', width: 180 },
  { id: 'startDate', label: 'Date début', width: 220 },
  { id: 'endDate', label: 'Date fin', width: 180 },
  { id: 'status', label: 'Statut', width: 100 },
  { id: '', width: 88 },
];

const STATUS_OPTIONS = [
  { value: 'all', label: 'Tous' },
  { value: 'pending', label: 'Demandes non traitées' },
  { value: 'approved', label: 'Demandes traitées' },
];

export function AbsenceTab() {
  const table = useTable();

  const router = useRouter();
  const confirm = useBoolean();
  const [tableData, setTableData] = useState(initialAbsences);

  const filters = useSetState({ status: 'all' });

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset = filters.state.status !== 'all';

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      table.onResetPage();
      filters.setState({ status: newValue });
    },
    [filters, table]
  );

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      toast.success('Delete success!');

      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.root);
    },
    [router]
  );

  return (
    <>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Congés & absences</Typography>
        <Button href={paths.dashboard.conges.add} LinkComponent={RouterLink} variant="outlined" color="primary" startIcon={<Iconify icon="ic:round-plus" />}>
          Créer
        </Button>
      </Box>
      <Card>
        <Tabs
          value={filters.state.status}
          onChange={handleFilterStatus}
          sx={{
            px: 2.5,
            boxShadow: (theme) =>
              `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
          }}
        >
          {STATUS_OPTIONS.map((tab) => (
            <Tab
              key={tab.value}
              iconPosition="end"
              value={tab.value}
              label={tab.label}
              icon={
                <Label
                  variant={
                    ((tab.value === 'all' || tab.value === filters.state.status) && 'filled') ||
                    'soft'
                  }
                  color={
                    (tab.value === 'active' && 'success') ||
                    (tab.value === 'pending' && 'warning') ||
                    (tab.value === 'approved' && 'success') ||
                    'default'
                  }
                >
                  {['active', 'pending', 'approved'].includes(tab.value)
                    ? tableData.filter((user) => user.status === tab.value).length
                    : tableData.length}
                </Label>
              }
            />
          ))}
        </Tabs>

        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              rowCount={dataFiltered.length}
              onSort={table.onSort}
            />

            <TableBody>
              {dataFiltered
                .slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                )
                .map((row) => (
                  <AbsenceListRow
                    onEditRow={() => handleEditRow(row.id)}
                    key={row.id}
                    row={row}
                    onDeleteRow={() => handleDeleteRow(row.id)}
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
        <TablePaginationCustom
          page={table.page}
          count={dataFiltered.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </>
  );
}

function applyFilter({ inputData, comparator, filters }) {
  const { status } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (status !== 'all') {
    inputData = inputData.filter((user) => user.status === status);
  }

  return inputData;
}


// NOTES 

// MISSING {Compteur de congés}
// MISSING {Détail des congés pris}