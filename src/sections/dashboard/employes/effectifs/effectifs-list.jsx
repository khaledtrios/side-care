import React, { useState, useCallback } from 'react';

import { Box, Card, Table, Button, Tooltip, TableBody, IconButton } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter, fIsBetween } from 'src/utils/format-time';

import { COLLEGE, ENTREPRISE, _employesList, TYPE_CONTRACT } from 'src/_mock/_employes';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { EffectifsRow } from './effectifs-row';
import { EffectifsToolbar } from './effectifs-toolbar';

const TABLE_HEAD = [
  { id: 'name', label: 'Employé' },
  { id: 'contract', label: 'Type de contrat' },
  { id: 'college', label: 'Poste' },
  { id: 'startDate', label: 'Début de contrat' },
  { id: 'endDate', label: 'Fin de contrat' },
  { id: 'actions' },
];
export default function EffectifsList() {
  const table = useTable();

  const router = useRouter();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState(_employesList);

  const filters = useSetState({
    name: '',
    entreprise: 'Toutes mes entreprises',
    contract: 'Type de contrat',
    college: 'Toutes les collèges',
    startDate: null,
    endDate: null,
    statut: 'Toutes les salariès',
  });

  const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
    dateError,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  //   To Change
  const canReset = '';
  //     !!filters.state.name || filters.state.role.length > 0 || filters.state.status !== 'all';

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      toast.success('Suppression effectué');

      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

    toast.success('Suppression effectué');

    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.employes);
      // router.push(paths.dashboard.user.edit(id));
      console.log(id);
    },
    [router]
  );
  return (
    <>
      <Card>
        <EffectifsToolbar
          filters={filters}
          onResetPage={table.onResetPage}
          options={{ entreprise: ENTREPRISE, contract: TYPE_CONTRACT, college: COLLEGE }}
          dateError={dateError}
        />
        <Box sx={{ position: 'relative' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={dataFiltered.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                dataFiltered.map((row) => row.id)
              )
            }
            action={
              <Tooltip title="Supprimer">
                <IconButton color="primary" onClick={confirm.onTrue}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            }
          />

          <Scrollbar>
            <Table size="medium" sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={dataFiltered.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    dataFiltered.map((row) => row.id)
                  )
                }
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <EffectifsRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      onEditRow={() => handleEditRow(row.id)}
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

        <TablePaginationCustom
          page={table.page}
          count={dataFiltered.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Supprimer"
        content={
          <>
            Êtes-vous sûr de vouloir supprimer <strong> {table.selected.length} </strong> élèments?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Supprimer
          </Button>
        }
      />
    </>
  );
}
function applyFilter({ inputData, comparator, filters, dateError }) {
  const { name, entreprise, contract, college, startDate, endDate, statut } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (entreprise !== 'Toutes mes entreprises') {
    inputData = inputData.filter((user) => user.entreprise === entreprise);
  }
  if (contract !== 'Type de contrat') {
    inputData = inputData.filter((user) => user.contract === contract);
  }
  if (college !== 'Toutes les collèges') {
    inputData = inputData.filter((user) => user.college === college);
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((user) => fIsBetween(user.startDate, startDate, endDate));
    }
  }

  if (statut !== 'Toutes les salariès') {
    if (statut === 'Ancien salariés') {
      inputData = inputData.filter((user) => !!user.endDate);
    }
    if (statut === 'Salariés actuels') {
      inputData = inputData.filter((user) => !user.endDate);
    }
  }

  // if (role.length) {
  //   inputData = inputData.filter((user) => role.includes(user.role));
  // }

  return inputData;
}
