import React, { useState, useCallback } from 'react';

import {
  Box,
  Card,
  Stack,
  Table,
  Select,
  MenuItem,
  TableBody,
  TextField,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';

import { useSetState } from 'src/hooks/use-set-state';

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

import CompteurTableRow from '../compteur-table-row';
import { CompteurFilterResult } from '../compteur-filter-result';

const TABLE_HEAD = [
  { id: 'employe', label: 'Employé' },
  { id: 'soldPaid', label: 'Solde de congés payés' },
  { id: 'soldRtt', label: 'Solde de RTT' },
  { id: 'actions', label: '' },
];

const exampleData = [
  {
    id: '1',
    employe: 'Alice Dupont',
    soldPaid: 15,
    soldRtt: 5,
    entreprise: 'Entreprise 1',
  },
  {
    id: '2',
    employe: 'Jean Martin',
    soldPaid: 10,
    soldRtt: 3,
    entreprise: 'Entreprise 1',
    deleted_at: '2024-05-01',
  },
  {
    id: '3',
    employe: 'Sophie Bernard',
    soldPaid: 8,
    soldRtt: 2,
    entreprise: 'Entreprise 1',
  },
];

export default function CompteurTabContent() {
  const table = useTable({ defaultOrderBy: 'createDate' });

  

  const [tableData, setTableData] = useState(exampleData);

  const activeEmployees = tableData.filter((item) => !item.deleted_at);
  const oldEmployees = tableData.filter((item) => item.deleted_at);

  const [showOld, setShowOld] = useState(false);

  const filters = useSetState({
    name: '',
    entreprise: '',
  });

  const dataFiltered = applyFilter({
    inputData: activeEmployees,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset = !!filters.state.name || !!filters.state.entreprise;

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilterName = useCallback(
    (event) => {
      table.onResetPage();
      filters.setState({ name: event.target.value });
    },
    [filters, table]
  );

  const handleFilterService = useCallback(
    (event) => {
      const newValue = event.target.value; // Just a string now
      table.onResetPage();
      filters.setState({ entreprise: newValue });
    },
    [filters, table]
  );
  return (
    <>
    <Card>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
      >
        <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 220 } }}>
          <InputLabel htmlFor="invoice-filter-service-select-label">Entreprise</InputLabel>

          <Select
            value={filters.state.entreprise}
            onChange={handleFilterService}
            input={<OutlinedInput label="Entreprise" />}
            renderValue={(selected) => selected}
            inputProps={{ id: 'invoice-filter-service-select-label' }}
            sx={{ textTransform: 'capitalize' }}
          >
            {['Entreprise 1', 'Entreprise 2'].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <TextField
            fullWidth
            label="Nom et Prénom"
            value={filters.state.name}
            onChange={handleFilterName}
            placeholder="Rechercher par nom et prénom"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Stack>

      {canReset && (
        <CompteurFilterResult
          filters={filters}
          onResetPage={table.onResetPage}
          totalResults={dataFiltered.length}
          sx={{ p: 2.5, pt: 0 }}
        />
      )}

      <Box sx={{ position: 'relative' }}>
        <Scrollbar sx={{ minHeight: 444 }}>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
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
                  <CompteurTableRow key={row.id} row={row} />
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
      <TablePaginationCustom
        page={table.page}
        dense={table.dense}
        count={dataFiltered.length}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onChangeDense={table.onChangeDense}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />
    </Card>
    <Box sx={{ mt: 3 }}>
  <Box
    component="span"
    onClick={() => setShowOld(!showOld)}
    sx={{
      color: 'primary.main',
      cursor: 'pointer',
      fontWeight: 600,
      textDecoration: 'underline',
    }}
  >
    {showOld ? 'Masquer les anciens collaborateurs' : 'Afficher les anciens collaborateurs'}
  </Box>

  {showOld && (
    <Box sx={{ mt: 2 }}>
      <Scrollbar sx={{ minHeight: 300 }}>
        <Table size="medium" sx={{ minWidth: 800 }}>
          <TableHeadCustom
            order={table.order}
            orderBy={table.orderBy}
            headLabel={TABLE_HEAD}
            rowCount={oldEmployees.length}
            onSort={table.onSort}
          />

          <TableBody>
            {oldEmployees.map((row) => (
              <CompteurTableRow key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </Box>
  )}
</Box>
    </>
  );
}

function applyFilter({ inputData, comparator, filters, dateError }) {
  const { name, entreprise } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (invoice) => invoice.employe.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (entreprise) {
    inputData = inputData.filter(
      (invoice) => invoice.entreprise.toLowerCase().indexOf(entreprise.toLowerCase()) !== -1
    );
  }

  return inputData;
}
