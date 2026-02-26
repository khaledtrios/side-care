import React, { useState } from 'react';

import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  MenuList,
  MenuItem,
  TableHead,
  TableCell,
  TableBody,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter } from 'src/utils/format-time';

import { clotureMock } from 'src/_mock/_cloture';
import { DashboardContent } from 'src/layouts/dashboard';

import { useTable } from 'src/components/table';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import ClotureTableToolbar from '../cloture-table-toolbar';

export default function ClotureListView() {
  const popover = usePopover();
  const table = useTable({ defaultOrderBy: 'date' });

  const filters = useSetState({
    employe: '',
    entreprise: '',
    period: null,
  });

  const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);

  const [tableData] = useState(clotureMock);

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Clôture"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Clôture', href: paths.dashboard.evp.cloture.root },
          { name: 'Liste' },
        ]}
        action={
          <Stack flexDirection="row" spacing={1}>
            <Button
              startIcon={<Iconify icon="solar:copy-outline" />}
              variant="contained"
              color="primary"
              LinkComponent={RouterLink}
            >
              Clôture
            </Button>
            <Button
              onClick={popover.onOpen}
              startIcon={<Iconify icon="uil:export" />}
              variant="outlined"
              color="primary"
            >
              Exporter
            </Button>

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
                  Congés & absences (format SILAE)
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    popover.onClose();
                  }}
                >
                  Primes et Notes de frais (format SILAE)
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    popover.onClose();
                  }}
                >
                  Clôture september 2025 (.xlsx)
                </MenuItem>
              </MenuList>
            </CustomPopover>
          </Stack>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <ClotureTableToolbar
          filters={filters}
          onResetPage={table.onResetPage}
          dateError={dateError}
          options={{ entreprises: ['Société 1'] }}
        />
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Entreprise</TableCell>
              <TableCell>Période</TableCell>
              <TableCell>Nb employés</TableCell>
              <TableCell>Absences</TableCell>
              <TableCell>Primes</TableCell>
              <TableCell>Notes de frais</TableCell>
              <TableCell>Transport</TableCell>
              <TableCell>Statut</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.entreprise}</TableCell>
                <TableCell>{row.period}</TableCell>
                <TableCell>{row.nbEmployes}</TableCell>
                <TableCell>{row.absences}</TableCell>
                <TableCell>{row.primes}</TableCell>
                <TableCell>{row.notesFrais}</TableCell>
                <TableCell>{row.transport}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </DashboardContent>
  );
}
