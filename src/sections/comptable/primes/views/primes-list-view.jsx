import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useSetState } from 'src/hooks/use-set-state';

import { fCurrency } from 'src/utils/format-number';

import { ComptableContent } from 'src/layouts/comptable';
import { fakePrimes, PRIME_STATUS, getPrimesSummary } from 'src/_mock/_primes';

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
  TablePaginationCustom,
} from 'src/components/table';

import PrimesTableRow from '../primes-table-row';
import PrimesAddDialog from '../primes-add-dialog';
import PrimesTableToolbar from '../primes-table-toolbar';
import { PrimesFilterResult } from '../primes-filter-result';

const TABLE_HEAD = [
  { id: 'employe', label: 'Employé' },
  { id: 'type', label: 'Type de prime' },
  { id: 'amount', label: 'Montant' },
  { id: 'period', label: 'Période' },
  { id: 'status', label: 'Statut' },
  { id: 'actions', label: '', width: 88 },
];

function StatCard({ title, value, subtitle, color = 'primary', icon }) {
  return (
    <Card sx={{ p: 3, height: '100%' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h4" sx={{ mt: 1, color: `${color}.main` }}>
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: `${color}.lighter`,
            color: `${color}.main`,
          }}
        >
          <Iconify icon={icon} width={24} />
        </Box>
      </Stack>
    </Card>
  );
}

export default function PrimesListView() {
  const table = useTable({ defaultOrderBy: 'createdAt' });

  const [tableData, setTableData] = useState(fakePrimes);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const filters = useSetState({
    entreprise: 'all',
    status: 'all',
    type: 'all',
    name: '',
    period: null,
  });

  const summary = getPrimesSummary(tableData);

  const dataFiltered = applyFilter({
    inputData: tableData,
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

  const handleUpdateStatus = useCallback((id, newStatus) => {
    setTableData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: newStatus,
              validatedAt: newStatus !== 'pending' ? new Date().toISOString().split('T')[0] : null,
              paidAt: newStatus === 'paid' ? new Date().toISOString().split('T')[0] : null,
            }
          : item
      )
    );
  }, []);

  const handleAddPrime = useCallback((newPrime) => {
    const id = Math.max(...tableData.map((p) => p.id)) + 1;
    setTableData((prev) => [
      {
        ...newPrime,
        id,
        status: 'pending',
        createdAt: new Date().toISOString().split('T')[0],
        validatedAt: null,
        paidAt: null,
      },
      ...prev,
    ]);
    setOpenAddDialog(false);
  }, [tableData]);

  return (
    <ComptableContent>
      <CustomBreadcrumbs
        heading="Gestion des Primes"
        links={[
          { name: 'Tableau de bord', href: paths.comptable.root },
          { name: 'Primes' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
        action={
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={() => setOpenAddDialog(true)}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              Ajouter une prime
            </Button>
            <Button
              component={RouterLink}
              href={paths.comptable.primes.settings}
              variant="outlined"
              startIcon={<Iconify icon="solar:settings-bold" />}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              Paramétrer
            </Button>
          </Stack>
        }
      />

      {/* Stats Cards */}
      <Box
        sx={{
          mb: 3,
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        <StatCard
          title="En attente"
          value={summary.pendingCount}
          subtitle={fCurrency(summary.pendingAmount)}
          color="warning"
          icon="material-symbols:hourglass-top"
        />
        <StatCard
          title="Validées"
          value={summary.approvedCount}
          subtitle={fCurrency(summary.approvedAmount)}
          color="info"
          icon="material-symbols:check-circle"
        />
        <StatCard
          title="Payées"
          value={summary.paidCount}
          subtitle={fCurrency(summary.paidAmount)}
          color="success"
          icon="material-symbols:payments"
        />
        <StatCard
          title="Total"
          value={fCurrency(summary.totalAmount)}
          subtitle={`${tableData.length} primes`}
          color="primary"
          icon="material-symbols:account-balance-wallet"
        />
      </Box>

      {/* Table Card */}
      <Card>
        <CardHeader
          title="Liste des primes"
          sx={{ mb: 2 }}
          action={
            <Button
              variant="outlined"
              size="small"
              startIcon={<Iconify icon="uil:export" />}
            >
              Exporter
            </Button>
          }
        />

        <PrimesTableToolbar
          filters={filters}
          onResetPage={table.onResetPage}
          options={{
            entreprises: [...new Set(tableData.map((p) => p.entreprise.name))],
            types: [...new Set(tableData.map((p) => p.typeLabel))],
            statuses: PRIME_STATUS,
          }}
        />

        {canReset && (
          <PrimesFilterResult
            filters={filters}
            onResetPage={table.onResetPage}
            totalResults={dataFiltered.length}
            sx={{ p: 2.5, pt: 0 }}
          />
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
                      onUpdateStatus={handleUpdateStatus}
                    />
                  ))}

                <TableEmptyRows
                  height={table.dense ? 56 : 76}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                />

                {notFound && <TableNoData notFound={notFound} />}
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

      {/* Add Prime Dialog */}
      <PrimesAddDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSave={handleAddPrime}
        entreprises={[...new Set(tableData.map((p) => p.entreprise))]}
      />
    </ComptableContent>
  );
}

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
