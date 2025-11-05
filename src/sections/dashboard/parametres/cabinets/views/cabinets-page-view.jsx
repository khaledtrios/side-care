import { toast } from 'sonner';
import React, { useState, useCallback } from 'react';

import { Box, Card, Table, Button, TableBody } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { DashboardContent } from 'src/layouts/dashboard';

import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
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

import CabinetsTableRow from '../cabinets-table-row';
import CabinetsFormDialog from '../cabinets-form-dialog';
import CabinetsTableToolbar from '../cabinets-table-toolbar';
import { CabinetsTableFiltersResult } from '../cabinets-table-filter-result';

const TABLE_HEAD = [
  { id: 'entreprise', label: 'Entreprise' },
  { id: 'cabinet', label: 'Cabinet Comptable' },
  { id: 'gestionnaire', label: 'Gestionnaire de paie' },
  { id: 'email', label: 'Email', width: 180 },
  { id: '', width: 88 },
]

const cabinetsList = [
  {
    id: 1,
    entreprise: 'Portorium Consulting',
    siret: '5925',
    cabinet: {
      id: 1,
      lastName: 'Wissem',
      firstName: 'Chihaoui',
      email: 'wissem@gmail.com',
    },
  },
  {
    id: 2,
    entreprise: 'Portorium Consulting',
    siret: '5925',
    cabinet: {},
  },
];
export default function CabinetsPageView() {
  const table = useTable();

  const router = useRouter();

  const confirm = useBoolean();

  const add = useBoolean();

  const [tableData, setTableData] = useState(cabinetsList);

  const filters = useSetState({ name: '', entreprise: '' });

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset = !!filters.state.name;

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      toast.success('Succès de la suppression !');

      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  return (
    <>
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Cabinets Experts-Comptable"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Paramètres & Intégrations', href: paths.dashboard.parametres.root },
          { name: 'Cabinets Experts-Comptable' },
        ]}
        action={
          (<Button variant='contained' color='primary'  onClick={()=>add.onTrue()}>Ajouter</Button>)
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Card>
        <CabinetsTableToolbar filters={filters} onResetPage={table.onResetPage}/> 

        {canReset && (
          <CabinetsTableFiltersResult
            filters={filters}
            totalResults={dataFiltered.length}
            onResetPage={table.onResetPage}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}

        <Box sx={{ position: 'relative' }}>
          <TableSelectedAction dense={table.dense} rowCount={dataFiltered.length} />

          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
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
                    <CabinetsTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      // onEditRow={() => handleEditRow(row.id)}
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
          dense={table.dense}
          count={dataFiltered.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onChangeDense={table.onChangeDense}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
    <CabinetsFormDialog open={add.value} onClose={add.onFalse} />
    </>
  );
}

function applyFilter({ inputData, comparator, filters }) {
  const { entreprise } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (entreprise) {
    inputData = inputData.filter(
      (user) => user.entreprise.toLowerCase().indexOf(entreprise.toLowerCase()) !== -1
    );
  }


  return inputData;
}