import React from 'react';

import { Card, Stack, Button, MenuList, MenuItem } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter } from 'src/utils/format-time';

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
              href={paths.dashboard.evp.notes.add}
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
        <EmptyContent />
      </Card>
    </DashboardContent>
  );
}
