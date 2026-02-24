import { toast } from 'sonner';
import React, { useState, useCallback } from 'react';

import {
  Box,
  Card,
  Stack,
  Table,
  Button,
  Dialog,
  Tooltip,
  MenuItem,
  MenuList,
  TableBody,
  IconButton,
  Typography,
  CardContent,
  DialogTitle,
  DialogContent,
  DialogActions,
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
import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
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

import NotesTableRow from '../notes-table-row';
import NotesTableToolbar from '../notes-table-toolbar';
import { NotesTableFilterResult } from '../notes-table-filters-result';

const TABLE_HEAD = [
  { id: 'employe', label: 'Employé' },
  { id: 'entreprise', label: 'Entreprise' },
  { id: 'date', label: 'Date Dépense' },
  {
    id: 'type',
    label: 'Type',
    width: 120,
  },
  { id: 'amount', label: 'Montant' },
  { id: 'status', label: 'Statut' },
  { id: 'description', label: 'Description' },
  { id: '', label: 'Action' },
];

const _notesList = [
  {
    id: 1,
    employe: 'Jane Doe',
    entreprise: 'Portorium Consulting',
    date: today(),
    type: 'Déplacement',
    amount: 100,
    status: 'pending',
    description: 'Frais du 28/06/2025',
  },
];

const statusList = [
  { value: 'refused', label: 'Réfusée' },
  { value: 'pending', label: 'En attente de justficatif' },
  { value: 'waiting', label: 'En attente de validation' },
  { value: 'validated', label: 'Validée' },
];

export default function NotesListView() {
  const table = useTable({ defaultOrderBy: 'date' });

  const popover = usePopover();

  const confirm = useBoolean();
  const mail = useBoolean();

  const router = useRouter();

  const [tableData, setTableData] = useState(_notesList);

  const filters = useSetState({
    entreprise: '',
    status: 'all',
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
    !!filters.state.entreprise ||
    filters.state.status !== 'all' ||
    (!!filters.state.startDate && !!filters.state.endDate);

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
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Notes de frais"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Notes de frais', href: paths.dashboard.evp.notes.root },
            { name: 'Liste' },
          ]}
          action={
            <Stack
              flexDirection="row"
              spacing={1}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              <Button
                startIcon={<Iconify icon="mingcute:add-line" />}
                variant="contained"
                color="primary"
                href={paths.dashboard.evp.notes.add}
                LinkComponent={RouterLink}
              >
                Ajouter
              </Button>
              <Button
                onClick={() => mail.onTrue()}
                startIcon={<Iconify icon="mynaui:send-solid" />}
                variant="outlined"
                color="primary"
              >
                Relance Email
              </Button>
              <Button
                variant="contained"
                startIcon={<Iconify icon="mdi:file-excel" />}
                onClick={() => {
                  // Handle "Détail notes de frais (.xlsx)"
                }}
              >
                Détail notes de frais (.xlsx)
              </Button>

              <Button
                variant="outlined"
                startIcon={<Iconify icon="mdi:folder-zip" />}
                onClick={() => {
                  // Handle "Justificatifs (.zip)"
                }}
              >
                Justificatifs (.zip)
              </Button>
            </Stack>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        {/* Mobile-only action buttons placed under the breadcrumbs */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 1, mt: 2, mb: { xs: 3, md: 0 } }}>
          <Button
            startIcon={<Iconify icon="mingcute:add-line" />}
            variant="contained"
            color="primary"
            href={paths.dashboard.evp.notes.add}
            LinkComponent={RouterLink}
            sx={{ width: '100%' }}
          >
            Ajouter
          </Button>

          <Button
            onClick={() => mail.onTrue()}
            startIcon={<Iconify icon="mynaui:send-solid" />}
            variant="outlined"
            color="primary"
            sx={{ width: '100%' }}
          >
            Relance Email
          </Button>

          <Button
            variant="contained"
            startIcon={<Iconify icon="mdi:file-excel" />}
            sx={{ width: '100%' }}
            onClick={() => {
              // Handle "Détail notes de frais (.xlsx)"
            }}
          >
            Détail notes de frais (.xlsx)
          </Button>

          <Button
            variant="outlined"
            startIcon={<Iconify icon="mdi:folder-zip" />}
            sx={{ width: '100%' }}
            onClick={() => {
              // Handle "Justificatifs (.zip)"
            }}
          >
            Justificatifs (.zip)
          </Button>
        </Box>
        <Card>
          <NotesTableToolbar
            filters={filters}
            onResetPage={table.onResetPage}
            dateError={dateError}
            options={{ status: statusList }}
          />

          {canReset && (
            <NotesTableFilterResult
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
                  onSort={table.onSort}
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <NotesTableRow
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
          <CardContent>{!tableData.length && <EmptyContent />}</CardContent>
        </Card>
      </DashboardContent>
      <Dialog open={mail.value} onClose={mail.onFalse} maxWidth="xs" fullWidth>
        <DialogTitle>Relancer les employés sans justificatif</DialogTitle>

        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Les justificatifs sont automatiquement demandés par mail en fin de période.
            <br />
            <strong>Relancer quand même les employés ?</strong>
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => mail.onFalse()}>Annuler</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              toast.success('Relance envoyée aux employés sans justificatif.');
              mail.onFalse();
            }}
          >
            Relancer les employés
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
function applyFilter({ inputData, comparator, filters, dateError }) {
  const { status, entreprise, startDate, endDate } = filters;

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

  if (status !== 'all') {
    inputData = inputData.filter((order) => order.status === status);
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((order) => fIsBetween(order.date, startDate, endDate));
    }
  }

  return inputData;
}
