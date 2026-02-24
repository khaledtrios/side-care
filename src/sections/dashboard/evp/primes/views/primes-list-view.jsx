import React, { useState } from 'react';

import { Box, Card, Button, MenuItem, MenuList, IconButton, CardContent } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { DashboardContent } from 'src/layouts/dashboard';

import { useTable } from 'src/components/table';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import PrimesTableToolbar from '../primes-table-toolbar';

export default function PrimesListView() {
  const table = useTable({ defaultOrderBy: 'date' });

  const popover = usePopover();

  const confirm = useBoolean();

  const router = useRouter();

  const [primesList, setPrimesList] = useState([]);

  const filters = useSetState({
    entreprise: '',
    startDate: null,
    endDate: null,
  });
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
        <CardContent>{!primesList.length && <EmptyContent />}</CardContent>
      </Card>
    </DashboardContent>
  );
}
