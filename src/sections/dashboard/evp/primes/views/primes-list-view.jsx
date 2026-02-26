import React, { useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { Box, Card, Button, MenuItem, MenuList, IconButton } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { fakePrimes } from 'src/_mock/_primes';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { usePopover } from 'src/components/custom-popover';
import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';

import PrimesTableRow from '../primes-table-row';
import PrimesTableToolbar from '../primes-table-toolbar';

export default function PrimesListView() {
  const table = useTable({ defaultOrderBy: 'createdAt' });

  const popover = usePopover();

  const confirm = useBoolean();

  const router = useRouter();

  const [primesList, setPrimesList] = useState(fakePrimes);

  const filters = useSetState({
    entreprise: 'all',
    status: 'all',
    type: 'all',
    name: '',
    period: null,
  });

  const dataFiltered = applyFilter({
    inputData: primesList,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });

  const canReset =
    filters.state.entreprise !== 'all' ||
    filters.state.status !== 'all' ||
    filters.state.type !== 'all' ||
    !!filters.state.name ||
    !!filters.state.period;

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Primes"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Primes', href: paths.dashboard.evp.primes.root },
          { name: 'Liste' },
        ]}
        sx={{ mb: { xs: 0, md: 5 } }}
        action={
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', gap: 1, flexWrap: 'wrap' }}>
            <Button
              component={RouterLink}
              href={paths.dashboard.evp.primes.settings}
              variant="contained"
              color="primary"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Paramétrer les primes
            </Button>
            <Button
              variant="outlined"
              startIcon={<Iconify icon="uil:export" />}
              onClick={() => {
                // Handle export action here
              }}
            >
              Exporter le tableau
            </Button>
          </Box>
        }
      />

      {/* Mobile-only actions: show under breadcrumbs */}
      <Box sx={{ mt: 2, mb: { xs: 3, md: 0 }, display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 1 }}>
        <Button
          component={RouterLink}
          href={paths.dashboard.evp.primes.settings}
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{ width: '100%' }}
        >
          Paramétrer les primes
        </Button>

        <Button
          variant="outlined"
          startIcon={<Iconify icon="uil:export" />}
          sx={{ width: '100%', textTransform: 'none' }}
          onClick={() => {
            // Handle export action here
          }}
        >
          Exporter le tableau
        </Button>
      </Box>
      <Card>
        <PrimesTableToolbar filters={filters} />

        {canReset && (
          <Box sx={{ p: 2 }}>
            {/* show filter result summary if filters applied - keep simple */}
            <EmptyContent />
          </Box>
        )}

        <Box sx={{ position: 'relative' }}>
          <Scrollbar sx={{ minHeight: 400 }}>
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
                    <PrimesTableRow
                      key={row.id}
                      row={row}
                      onUpdateStatus={(id, newStatus) =>
                        setPrimesList((prev) => prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p)))
                      }
                    />
                  ))}

                <TableEmptyRows
                  height={table.dense ? 56 : 76}
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

const TABLE_HEAD = [
  { id: 'employe', label: 'Employé' },
  { id: 'type', label: 'Type de prime' },
  { id: 'amount', label: 'Montant' },
  { id: 'period', label: 'Période' },
  { id: 'status', label: 'Statut' },
  { id: 'actions', label: '', width: 88 },
];

function applyFilter({ inputData, comparator, filters }) {
  const { entreprise, status, type, name, period } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (entreprise !== 'all') {
    inputData = inputData.filter((prime) => prime.entreprise.name === entreprise);
  }

  if (status !== 'all') {
    inputData = inputData.filter((prime) => prime.status === status);
  }

  if (type !== 'all') {
    inputData = inputData.filter((prime) => prime.typeLabel === type);
  }

  if (name) {
    inputData = inputData.filter(
      (prime) =>
        prime.employe.name.toLowerCase().includes(name.toLowerCase()) ||
        prime.description.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (period) {
    inputData = inputData.filter((prime) => prime.period === period);
  }

  return inputData;
}
