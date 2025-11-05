import { toast } from 'sonner';
import React, { useState, useCallback } from 'react';

import {
  Box,
  Card,
  Table,
  Stack,
  Button,
  Tooltip,
  MenuItem,
  MenuList,
  TableBody,
  IconButton,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { today, fIsAfter, fIsBetween } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import {
  useTable,
  rowInPage,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import EntretienTableRow from '../entretien-table-row';
import EntretienTableToolbar from '../entretien-table-toolbar';
import EntretienTableFilterResult from '../entretien-table-filter-result';

const TABLE_HEAD = [
  { id: 'manager', label: 'Bénéficiaire' },
  { id: 'entreprise', label: 'Entreprise' },
  { id: 'type', label: 'Type' },
  { id: 'date', label: 'Date' },
  { id: 'actions', label: '' },
];

const _entretiens = [
  {
    id: 1,
    manager: 'Wissem Chihaoui',
    entreprise: 'Entreprise 1',
    type: '1',
    date: today(),
  },
  {
    id: 2,
    manager: 'Wissem Chihaoui 2',
    entreprise: 'Portorium Consulting',
    type: '1',
    date: today(),
  },
];

export default function EntretienListView() {
  const table = useTable({ defaultOrderBy: 'date' });

  const popover = usePopover();

  const confirm = useBoolean();

  const router = useRouter();

  const [tableData, setTableData] = useState(_entretiens);

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

      toast.success('Delete success!');

      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

    toast.success('Delete success!');

    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.order.details(id));
    },
    [router]
  );

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Entretiens"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Gestion RH', href: paths.dashboard.gestionRh.root },
          { name: 'Entretiens' },
        ]}
        action={
          <Stack flexDirection="row" spacing={1}>
            <Button
              startIcon={<Iconify icon="mingcute:add-line" />}
              variant="contained"
              color="primary"
              href={paths.dashboard.gestionRh.entretien.add}
              LinkComponent={RouterLink}
            >
              Créer un entretien
            </Button>
            <Button
              LinkComponent={RouterLink}
              href={paths.dashboard.gestionRh.entretien.types(_entretiens[0]?.id)}
              startIcon={<Iconify icon="mdi:cog-outline" />}
              variant="outlined"
              color="primary"
            >
              Personnaliser
            </Button>
            <IconButton onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
            <CustomPopover
              open={popover.open}
              anchorEl={popover.anchorEl}
              onClose={popover.onClose}
              slotProps={{ arrow: { placement: 'top-right' } }}
            >
              <MenuList>
                <MenuItem
                  onClick={() => {
                    popover.onClose();
                  }}
                >
                  Liste des entretiens (.xlsx)
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    popover.onClose();
                  }}
                >
                  Comptes-rendus d&apos;entretiens (.zip)
                </MenuItem>
              </MenuList>
            </CustomPopover>
          </Stack>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <EntretienTableToolbar
          filters={filters}
          onResetPage={table.onResetPage}
          dateError={dateError}
          options={{ entreprises: ['Entreprise 1', 'Entreprise 2', 'Portorium Consulting'] }}
        />

        {canReset && (
          <EntretienTableFilterResult
            filters={filters}
            totalResults={dataFiltered.length}
            onResetPage={table.onResetPage}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}

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
                    <EntretienTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
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
    inputData = inputData.filter(
      (user) => user.entreprise.toLowerCase().indexOf(entreprise.toLowerCase()) !== -1
    );
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((row) => fIsBetween(row.date, startDate, endDate));
    }
  }

  return inputData;
}
