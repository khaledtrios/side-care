import { toast } from 'sonner';
import React, { useState, useCallback } from 'react';

import { Box, Card, Stack, Table, Button, Tooltip, TableBody, IconButton } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { today, fIsAfter, fIsBetween } from 'src/utils/format-time';

import { SalariesContent } from 'src/layouts/salarie';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { useTable, emptyRows, rowInPage, TableNoData, getComparator, TableEmptyRows, TableHeadCustom, TableSelectedAction } from 'src/components/table';

import TransportTableRow from '../table-transport-row';

const TABLE_HEAD = [
  { id: 'date', label: 'Période' },
  { id: 'type', label: 'Type' },
  { id: 'amount_total', label: 'Montant total' },
  { id: 'amount_rembourse', label: 'Montant remboursé' },
  { id: 'prise', label: 'Prise en charge employeur' },
  { id: 'justificatif', label: 'Justificatif' },
  { id: '', label: 'Actions' },
];

const _transportList = [
  {
    id: 1,
    entreprise: 'Portorium Consulting',
    date: today(),
    type: 'Transport domicile-travail',
    amount_total: 120, // total spent
    amount_rembourse: 100, // reimbursed
    prise: '50%', // % covered by employer
    justificatif: '/files/justificatif1.pdf', // or false/null if none
  },
  {
    id: 2,
    entreprise: 'Sofrecom',
    date: today(),
    type: 'Forfait mensuel',
    amount_total: 80,
    amount_rembourse: 80,
    prise: '100%',
    justificatif: '', // no file
  },
];

export default function TransportViewPage() {
   const table = useTable({ defaultOrderBy: 'date' });
  
    const confirm = useBoolean();
  
    const router = useRouter();
  
    const [tableData, setTableData] = useState(_transportList);
  
    const filters = useSetState({
      entreprise: '',
      startDate: null,
      endDate: null,
    });
  
    const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);
  
    const dataFiltered = applyFilter({
      inputData: tableData,
      comparator: getComparator(table.order, table.orderBy),
      filters: filters.state,
      dateError,
    });
  
    const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);
  
    const canReset =
      !!filters.state.entreprise || (!!filters.state.startDate && !!filters.state.endDate);
  
    const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;
  
    const handleDeleteRow = useCallback(
      (id) => {
        const deleteRow = tableData.filter((row) => row.id !== id);
  
        toast.success('La suppression réussie !');
  
        setTableData(deleteRow);
  
        table.onUpdatePageDeleteRow(dataInPage.length);
      },
      [dataInPage.length, table, tableData]
    );
  
    const handleViewRow = useCallback(
      (id) => {
        router.push(paths.dashboard.evp.notes.view(id));
      },
      [router]
    );
  
  return (
    <SalariesContent>
      <CustomBreadcrumbs
        heading="Mes titres de transport"
        links={[
          { name: 'Tableau de bord', href: paths.salaries.root },
          { name: 'Mes titres de transport' },
        ]}
        action={
          <Stack flexDirection="row" spacing={1}>
            <Button
              startIcon={<Iconify icon="mingcute:add-line" />}
              variant="contained"
              color="primary"
              href={paths.salaries.transport.addRecurrent}
              LinkComponent={RouterLink}
            >
              Ajouter titre de transport récurrent
            </Button>
            <Button
              startIcon={<Iconify icon="mingcute:add-line" />}
              variant="outlined"
              color="primary"
              href={paths.salaries.transport.addPonctuel}
              LinkComponent={RouterLink}
            >
              Ajouter titre de transport ponctuel
            </Button>
          </Stack>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        {/* Toolbar  */}
        {/* Filter Result  */}

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

          <Scrollbar sx={{ minHeight: 444 }}>
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
                    <TransportTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      onViewRow={() => handleViewRow(row.id)}
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
      </Card>
    </SalariesContent>
  );
}
function applyFilter({ inputData, comparator, filters, dateError }) {
  const { entreprise, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (entreprise) {
    inputData = inputData.filter((order) => order.entreprise === entreprise);
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((order) => fIsBetween(order.date, startDate, endDate));
    }
  }

  return inputData;
}