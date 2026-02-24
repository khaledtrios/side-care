import { toast } from 'sonner';
import React, { useState, useCallback } from 'react';

import {
  Box,
  Card,
  Stack,
  Table,
  Button,
  Tooltip,
  TableBody,
  IconButton,
  Typography,
  Divider,
} from '@mui/material';

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
import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
} from 'src/components/table';

import TransportTableRow from '../table-transport-row';
import TransportTableToolbar from '../transport-table-toolbar';

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
    date: today(),
    type: 'Transport domicile-travail',
    amount_total: 120, // total spent
    justificatif: '/files/justificatif1.pdf', // or false/null if none
    frequency: 'Mensuelle', // Frequency of justification
    startDate: '2025-11', // Start date of the transport
    endDate: '2026-11', // End date of the transport
  },
  {
    id: 2,
    date: today(),
    type: 'Forfait mensuel',
    amount_total: 80,
    justificatif: '', // no file
    frequency: 'Mensuelle', // Frequency of justification
    startDate: '2025-12', // Start date of the transport
    endDate: '2026-12', // End date of the transport
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

  const handleEditRow = useCallback(
    (id) => {
      router.push(`${paths.salaries.transport.editRecurrent.replace(":id", id)}`); // This ensures the dynamic `id` is passed into the edit page URL.
    },
    [router]
  );

  return (
    <SalariesContent>
      <CustomBreadcrumbs
        heading="Mes titres de transport"
        description="Retrouvez tous vos titres de transport. Déposez tous vos nouveaux justificatifs afin de vous faire rembourser"
        links={[
          { name: 'Tableau de bord', href: paths.salaries.root },
          { name: 'Mes titres de transport' },
        ]}
        action={
          <Stack
            flexDirection="column"
            spacing={2}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
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
        sx={{ mb: { xs: 0, md: 5 } }}
      />

      {/* Mobile-only action buttons under the breadcrumbs */}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 1, mt: 2, mb: { xs: 3, md: 0 } }}>
        <Button
          startIcon={<Iconify icon="mingcute:add-line" />}
          variant="contained"
          color="primary"
          href={paths.salaries.transport.addRecurrent}
          LinkComponent={RouterLink}
          sx={{ width: '100%' }}
        >
          Ajouter titre de transport récurrent
        </Button>

        <Button
          startIcon={<Iconify icon="mingcute:add-line" />}
          variant="outlined"
          color="primary"
          href={paths.salaries.transport.addPonctuel}
          LinkComponent={RouterLink}
          sx={{ width: '100%' }}
        >
          Ajouter titre de transport ponctuel
        </Button>
      </Box>
      
      <Card sx={{ mb: { xs: 3, md: 3, minHeight: 44 } }}>
        <Stack direction="column" spacing={1} sx={{ p: 2 }} divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />}>
          {tableData.map((row) => (
            <Typography variant="body1" sx={{ flexGrow: 1 }} key={row.id}>
              Vous avez un titre de transport récurrent : {row.type} d’un montant de {row.amount_total} € par mois.
              <Tooltip title="Modifier" arrow>
                <IconButton color="primary" size='large' onClick={() => handleEditRow(row.id)}>
                  <Iconify icon="mdi:pencil-outline"/>
                </IconButton>
              </Tooltip>
            </Typography>
          ))}
        </Stack>
      </Card>
      
      <Card>
        {/* Toolbar  */}
        <TransportTableToolbar
          filters={filters}
          onResetPage={table.onResetPage}
          dateError={dateError}
        />
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
