import React, { useMemo, useState } from 'react';

import { Stack } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useSetState } from 'src/hooks/use-set-state';

import { orderBy } from 'src/utils/helper';

import { DashboardContent } from 'src/layouts/dashboard';

import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import TrombinoscopeSort from '../trombinoscope-sort';
import { TrombinoscopeListe } from '../trombinoscope-liste';
import TrombinoscopeFilters from '../trombinoscope-filters';

const data = [
  {
    id: 1,
    createdAt: '2024-06-02',
    picture: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d',
    name: 'John Doe',
    entreprise: {
      id: 1,
      name: 'Portorium Consulting',
    },
  },
  {
    id: 2,
    createdAt: '2024-06-01',
    picture: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d',
    name: 'Jane Smith',
    entreprise: {
      id: 2,
      name: 'Tech Innovators',
    },
  },
];

export default function TrombinoscopeGridView() {
  const [sortBy, setSortBy] = useState('latest');

  const filters = useSetState({
    name: '',
    entreprise: [],
  });


  const entrepriseOptions = useMemo(
    () => [...new Set(data.map((item) => item.entreprise.name))],
    []
  );

  const dataFiltered = applyFilter({
    inputData: data,
    filters: filters.state,
    sortBy,
  });

  const canReset = !!filters.state.name || filters.state.entreprise.length > 0;
  const notFound = !dataFiltered.length && canReset;

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Trombinoscope"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Employés', href: paths.dashboard.employes.root },
          { name: 'Trombinoscope' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Stack
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-end', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
      >
        <TrombinoscopeFilters filters={filters} options={{ entreprise: entrepriseOptions }} />
        <TrombinoscopeSort sort={sortBy} onSort={setSortBy} />
      </Stack>
      {notFound && <EmptyContent filled sx={{ py: 10 }} />}
      <TrombinoscopeListe data={dataFiltered} />
    </DashboardContent>
  );
}

const applyFilter = ({ inputData, filters, sortBy }) => {
  let filtered = [...inputData];
  const { name, entreprise } = filters;

 if (sortBy === 'nameAsc') {
    filtered = orderBy(filtered, ['name'], ['asc']);
  } else if (sortBy === 'nameDesc') {
    filtered = orderBy(filtered, ['name'], ['desc']);
  } else if (sortBy === 'dateAsc') {
    filtered = orderBy(filtered, ['createdAt'], ['asc']);
  } else if (sortBy === 'dateDesc') {
    filtered = orderBy(filtered, ['createdAt'], ['desc']);
  }

  // Name filter
  if (name) {
    filtered = filtered.filter((row) => row.name.toLowerCase().includes(name.toLowerCase()));
  }

  // Entreprise filter
  if (entreprise.length) {
    filtered = filtered.filter((row) => entreprise.includes(row.entreprise.name));
  }

  // Sorting (optional logic)
  if (sortBy === 'latest') {
    filtered = orderBy(filtered, ['id'], ['desc']);
  }

  return filtered;
};
