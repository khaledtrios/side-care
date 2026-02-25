/* eslint-disable import/order */
import { toast } from 'sonner';
import React, { useState, useCallback } from 'react';

import {
  Box,
  Card,
  Chip,
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
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { fCurrency } from 'src/utils/format-number';
import * as formatTime from 'src/utils/format-time';

import { CONFIG } from 'src/config-global';
import { ComptableContent } from 'src/layouts/comptable';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import { Scrollbar } from 'src/components/scrollbar';
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

import { BoiteOutilsItems } from 'src/sections/dashboard/aide/course-widget-summary';

import ClotureTableRow from '../cloture-table-row';
import ClotureTableToolbar from '../cloture-table-toolbar';
import { ClotureTableFilterResult } from '../cloture-table-filter-result';

const TABLE_HEAD = [
  { id: 'entreprise', label: 'Entreprise' },
  { id: 'period', label: 'Période' },
  { id: 'nbEmployes', label: 'Nb employés' },
  { id: 'absences', label: 'Absences' },
  { id: 'primes', label: 'Primes' },
  { id: 'notesFrais', label: 'Notes de frais' },
  { id: 'transport', label: 'Transport' },
  { id: 'status', label: 'Statut' },
  { id: '', label: 'Actions' },
];

const _clotureList = [
  {
    id: 1,
    entreprise: 'Portorium Consulting',
    period: formatTime.today(),
    nbEmployes: 25,
    absences: 8,
    primes: 12,
    notesFrais: 45,
    transport: 20,
    status: 'pending',
    totalMontant: 15420.5,
  },
  {
    id: 2,
    entreprise: 'Sofrecom',
    period: formatTime.today(),
    nbEmployes: 42,
    absences: 15,
    primes: 8,
    notesFrais: 32,
    transport: 38,
    status: 'validated',
    totalMontant: 28750.0,
  },
  {
    id: 3,
    entreprise: 'Tech Solutions',
    period: formatTime.today(),
    nbEmployes: 18,
    absences: 3,
    primes: 5,
    notesFrais: 22,
    transport: 15,
    status: 'draft',
    totalMontant: 9840.25,
  },
];

const statusList = [
  { value: 'all', label: 'Tous' },
  { value: 'draft', label: 'Brouillon' },
  { value: 'pending', label: 'En attente de validation' },
  { value: 'validated', label: 'Validée' },
  { value: 'exported', label: 'Exportée' },
];

export default function ClotureListView() {
  const table = useTable({ defaultOrderBy: 'period' });

  const popover = usePopover();

  const confirm = useBoolean();
  const exportDialog = useBoolean();

  const router = useRouter();

  const [tableData, setTableData] = useState(_clotureList);
  const details = useBoolean();
  const [selectedRow, setSelectedRow] = useState(null);

  const filters = useSetState({
    entreprise: '',
    status: 'all',
    period: null,
    employe: '',
  });

  const dateError = formatTime.fIsAfter(filters.state.startDate, filters.state.endDate);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset =
    !!filters.state.entreprise ||
    filters.state.status !== 'all' ||
    !!filters.state.period ||
    !!filters.state.employe;

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleValidateRow = useCallback(
    (id) => {
      const updatedData = tableData.map((row) =>
        row.id === id ? { ...row, status: 'validated' } : row
      );
      setTableData(updatedData);
      toast.success('Clôture validée avec succès !');
    },
    [tableData]
  );

  const handleViewRow = useCallback(
    (id) => {
      const row = tableData.find((r) => r.id === id) || null;
      setSelectedRow(row);
      details.onTrue();
    },
    [tableData, details]
  );

  const handleExportSilae = useCallback(
    (type) => {
      toast.success(`Export ${type} au format SILAE en cours...`);
      exportDialog.onFalse();
    },
    [exportDialog]
  );

  const handleExportExcel = useCallback(() => {
    toast.success('Export Excel en cours...');
    popover.onClose();
  }, [popover]);

  // Calculate summary stats
  const totalAbsences = tableData.reduce((sum, row) => sum + row.absences, 0);
  const totalPrimes = tableData.reduce((sum, row) => sum + row.primes, 0);
  const totalNotes = tableData.reduce((sum, row) => sum + row.notesFrais, 0);
  const totalTransport = tableData.reduce((sum, row) => sum + row.transport, 0);

  const statusLabelMap = {
    validated: 'Validée',
    pending: 'En attente',
    draft: 'Brouillon',
    exported: 'Exportée',
  };

  const statusColorMap = {
    validated: 'success',
    pending: 'warning',
    draft: 'default',
    exported: 'info',
  };

  return (
    <ComptableContent>
      <CustomBreadcrumbs
        heading="Clôture de paie"
        links={[
          { name: 'Tableau de bord', href: paths.comptable.root },
          { name: 'Clôture de paie', href: paths.comptable.cloture.root },
          { name: 'Liste' },
        ]}
        action={
          <Stack flexDirection="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button
              startIcon={<Iconify icon="solar:check-circle-bold" />}
              variant="contained"
              color="primary"
              onClick={() => {
                toast.success('Toutes les clôtures en attente ont été validées.');
              }}
            >
              Valider toutes les clôtures
            </Button>
            <Button
              onClick={exportDialog.onTrue}
              startIcon={<Iconify icon="uil:export" />}
              variant="outlined"
              color="primary"
            >
              Exporter
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
                <MenuItem onClick={handleExportExcel}>
                  <Iconify icon="mdi:file-excel" sx={{ mr: 1 }} />
                  Export complet (.xlsx)
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleExportSilae('Congés & absences');
                    popover.onClose();
                  }}
                >
                  <Iconify icon="mdi:file-document" sx={{ mr: 1 }} />
                  Congés & absences (SILAE)
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleExportSilae('Primes');
                    popover.onClose();
                  }}
                >
                  <Iconify icon="mdi:file-document" sx={{ mr: 1 }} />
                  Primes (SILAE)
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleExportSilae('Notes de frais');
                    popover.onClose();
                  }}
                >
                  <Iconify icon="mdi:file-document" sx={{ mr: 1 }} />
                  Notes de frais (SILAE)
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleExportSilae('Transport');
                    popover.onClose();
                  }}
                >
                  <Iconify icon="mdi:file-document" sx={{ mr: 1 }} />
                  Transport (SILAE)
                </MenuItem>
              </MenuList>
            </CustomPopover>
          </Stack>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {/* Mobile-only actions */}
      <Box
        sx={{
          mt: 2,
          mb: { xs: 3, md: 0 },
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Button
          startIcon={<Iconify icon="solar:check-circle-bold" />}
          variant="contained"
          color="primary"
          sx={{ width: '100%' }}
          onClick={() => {
            toast.success('Toutes les clôtures en attente ont été validées.');
          }}
        >
          Valider toutes les clôtures
        </Button>
        <Button
          onClick={exportDialog.onTrue}
          startIcon={<Iconify icon="uil:export" />}
          variant="outlined"
          color="primary"
          sx={{ width: '100%' }}
        >
          Exporter
        </Button>
      </Box>

      {/* Summary Cards */}
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          mb: 3,
        }}
      >
        <BoiteOutilsItems
          icon={`${CONFIG.assetsDir}/assets/icons/courses/ic-courses-progress.svg`}
          title="Absences"
          color="error"
          total={totalAbsences}
        />

        <BoiteOutilsItems
          icon={`${CONFIG.assetsDir}/assets/icons/courses/ic-courses-certificates.svg`}
          title="Primes"
          color="success"
          total={totalPrimes}
        />

        <BoiteOutilsItems
          icon={`${CONFIG.assetsDir}/assets/icons/courses/ic-courses-progress.svg`}
          title="Notes de frais"
          color="info"
          total={totalNotes}
        />

        <BoiteOutilsItems
          icon={`${CONFIG.assetsDir}/assets/icons/courses/ic-courses-completed.svg`}
          title="Transport"
          color="primary"
          total={totalTransport}
        />
      </Box>

      <Card>
        <ClotureTableToolbar
          filters={filters}
          onResetPage={table.onResetPage}
          dateError={dateError}
          options={{
            entreprises: ['Portorium Consulting', 'Sofrecom', 'Tech Solutions'],
            status: statusList,
          }}
        />

        {canReset && (
          <ClotureTableFilterResult
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
              <Stack direction="row" spacing={1}>
                <Tooltip title="Valider la sélection">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      toast.success('Clôtures sélectionnées validées.');
                    }}
                  >
                    <Iconify icon="solar:check-circle-bold" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Exporter la sélection">
                  <IconButton color="primary" onClick={exportDialog.onTrue}>
                    <Iconify icon="uil:export" />
                  </IconButton>
                </Tooltip>
              </Stack>
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
                    <ClotureTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onValidateRow={() => handleValidateRow(row.id)}
                      onViewRow={() => handleViewRow(row.id)}
                      onExportRow={() => {
                        toast.success(`Export de la clôture ${row.entreprise} en cours...`);
                      }}
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

      {/* Details Dialog */}
      <Dialog
        open={details.value}
        onClose={() => {
          setSelectedRow(null);
          details.onFalse();
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, overflow: 'hidden' } }}
      >
        {selectedRow && (
          <>
            {/* Widget-style header */}
            <Box
              sx={(theme) => ({
                px: 3,
                py: 2.5,
                position: 'relative',
                color: `${theme.palette.primary.darker}`,
                background: `linear-gradient(135deg, ${theme.palette.primary.lighter} 0%, ${theme.palette.primary.light} 100%)`,
                borderBottom: '1px solid',
                borderColor: 'divider',
              })}
            >
              <Box sx={{ width: 48, height: 48, mb: 2 }}>
                <Iconify icon="eva:briefcase-fill" width={36} height={36} />
              </Box>

              <Typography variant="overline" sx={{ opacity: 0.9, letterSpacing: 1.2 }}>
                Détails de la clôture
              </Typography>
              <Typography variant="h5" fontWeight={700} mt={0.5}>
                {selectedRow.entreprise}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.25 }}>
                {formatTime.fDate(selectedRow.period, 'MMMM YYYY')}
              </Typography>

              <SvgColor
                src={`${CONFIG.assetsDir}/assets/background/shape-square.svg`}
                sx={{
                  position: 'absolute',
                  right: -20,
                  top: 0,
                  width: 240,
                  height: 240,
                  opacity: 0.24,
                  color: 'primary.main',
                  zIndex: -1,
                }}
              />
            </Box>

            <DialogContent sx={{ p: 3 }}>
              {/* Stat tiles with Iconify icons */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 1.5,
                  mb: 3,
                }}
              >
                {[
                  { label: 'Employés', value: selectedRow.nbEmployes, icon: 'eva:people-fill' },
                  { label: 'Absences', value: selectedRow.absences, icon: 'eva:calendar-fill' },
                  { label: 'Primes', value: selectedRow.primes, icon: 'mdi:gift' },
                ].map(({ label, value, icon }) => (
                  <Box
                    key={label}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: 'background.neutral',
                      border: '1px solid',
                      borderColor: 'divider',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 0.5,
                    }}
                  >
                    <Box sx={{ color: 'primary.main' }}>
                      <Iconify icon={icon} width={28} height={28} />
                    </Box>
                    <Typography variant="h6" fontWeight={700} lineHeight={1.2}>
                      {value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {label}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Secondary stats */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 1.5,
                  mb: 3,
                }}
              >
                {[
                  { label: 'Notes de frais', value: selectedRow.notesFrais },
                  { label: 'Transport', value: selectedRow.transport },
                ].map(({ label, value }) => (
                  <Box
                    key={label}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: 'background.neutral',
                      border: '1px solid',
                      borderColor: 'divider',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {label}
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {value}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Total + Status */}
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Montant total
                  </Typography>
                  <Typography variant="h5" fontWeight={700} color="primary.main">
                    {fCurrency(selectedRow.totalMontant)}
                  </Typography>
                </Box>

                <Chip
                  label={statusLabelMap[selectedRow.status] || selectedRow.status}
                  color={statusColorMap[selectedRow.status] || 'default'}
                  variant="soft"
                  size="medium"
                  sx={{ fontWeight: 600, fontSize: 13 }}
                />
              </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
              <Button
                variant="outlined"
                onClick={() => {
                  setSelectedRow(null);
                  details.onFalse();
                }}
              >
                Fermer
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  if (selectedRow)
                    toast.success(`Export de la clôture ${selectedRow.entreprise} en cours...`);
                }}
              >
                Exporter
              </Button>
            </DialogActions>
          </>
        )}

        {/* Empty state */}
        {!selectedRow && (
          <DialogContent>
            <Typography color="text.secondary" textAlign="center" py={4}>
              Aucune donnée sélectionnée.
            </Typography>
          </DialogContent>
        )}
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={exportDialog.value} onClose={exportDialog.onFalse} maxWidth="sm" fullWidth>
        <DialogTitle>Exporter les données de clôture</DialogTitle>

        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Choisissez le type d&apos;export souhaité :
          </Typography>

          <Stack spacing={1}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Iconify icon="mdi:file-excel" />}
              onClick={() => {
                toast.success('Export Excel complet en cours...');
                exportDialog.onFalse();
              }}
            >
              Export complet (.xlsx)
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Iconify icon="mdi:calendar-remove" />}
              onClick={() => handleExportSilae('Congés & absences')}
            >
              Congés & absences (format SILAE)
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Iconify icon="mdi:cash-plus" />}
              onClick={() => handleExportSilae('Primes')}
            >
              Primes (format SILAE)
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Iconify icon="mdi:receipt" />}
              onClick={() => handleExportSilae('Notes de frais')}
            >
              Notes de frais (format SILAE)
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Iconify icon="mdi:train-car" />}
              onClick={() => handleExportSilae('Transport')}
            >
              Transport (format SILAE)
            </Button>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={exportDialog.onFalse}>Annuler</Button>
        </DialogActions>
      </Dialog>
    </ComptableContent>
  );
}

function applyFilter({ inputData, comparator, filters }) {
  const { entreprise, status, period, employe } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (entreprise) {
    inputData = inputData.filter((row) => row.entreprise === entreprise);
  }

  if (status !== 'all') {
    inputData = inputData.filter((row) => row.status === status);
  }

  return inputData;
}
