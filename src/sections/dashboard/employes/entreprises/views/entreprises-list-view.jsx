import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { orderBy } from 'src/utils/helper';

import { _jobs } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { ENTREPRISE_LIST } from 'src/_mock/_entreprises';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { JobList } from '../job-list';
import { JobSearch } from '../job-search';
import { JobFiltersResult } from '../job-filters-result';

// ----------------------------------------------------------------------

export function EntreprisesListView() {
  console.log(ENTREPRISE_LIST);

  const [sortBy, setSortBy] = useState('latest');

  const search = useSetState({ query: '', results: [] });

  const filters = useSetState({
    roles: [],
    locations: [],
    benefits: [],
    experience: 'all',
    employmentTypes: [],
  });

  const dataFiltered = applyFilter({ inputData: ENTREPRISE_LIST, filters: filters.state, sortBy });

  const canReset =
    filters.state.roles.length > 0 ||
    filters.state.locations.length > 0 ||
    filters.state.benefits.length > 0 ||
    filters.state.employmentTypes.length > 0 ||
    filters.state.experience !== 'all';

  const notFound = !dataFiltered.length && canReset;

  const handleSearch = useCallback(
    (inputValue) => {
      search.setState({ query: inputValue });

      if (inputValue) {
        const results = _jobs.filter(
          (job) => job.title.toLowerCase().indexOf(search.state.query.toLowerCase()) !== -1
        );

        search.setState({ results });
      }
    },
    [search]
  );

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-end', sm: 'center' }}
      direction={{ xs: 'column', sm: 'row' }}
    >
      <JobSearch search={search} onSearch={handleSearch} />
    </Stack>
  );

  const renderResults = <JobFiltersResult filters={filters} totalResults={dataFiltered.length} />;

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Mes entreprises"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Paramètres & Intégrations', href: paths.dashboard.parametres.root },
          { name: 'Mes entreprises' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.entreprise.addEntreprise}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            color="primary"
          >
            Ajouter entreprise
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Stack spacing={2.5} sx={{ mb: { xs: 3, md: 5 } }}>
        {renderFilters}

        {canReset && renderResults}
      </Stack>

      {notFound && <EmptyContent filled sx={{ py: 10 }} />}

      <JobList jobs={dataFiltered} />
    </DashboardContent>
  );
}

const applyFilter = ({ inputData, filters, sortBy }) => {
  const { employmentTypes, experience, roles, locations, benefits } = filters;

  // Sort by
  if (sortBy === 'latest') {
    inputData = orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    inputData = orderBy(inputData, ['createdAt'], ['asc']);
  }

  if (sortBy === 'popular') {
    inputData = orderBy(inputData, ['totalViews'], ['desc']);
  }

  // Filters
  if (employmentTypes.length) {
    inputData = inputData.filter((job) =>
      job.employmentTypes.some((item) => employmentTypes.includes(item))
    );
  }

  if (experience !== 'all') {
    inputData = inputData.filter((job) => job.experience === experience);
  }

  if (roles.length) {
    inputData = inputData.filter((job) => roles.includes(job.role));
  }

  if (locations.length) {
    inputData = inputData.filter((job) => job.locations.some((item) => locations.includes(item)));
  }

  if (benefits.length) {
    inputData = inputData.filter((job) => job.benefits.some((item) => benefits.includes(item)));
  }

  return inputData;
};
