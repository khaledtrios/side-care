import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';

import { useSetState } from 'src/hooks/use-set-state';

import { DashboardContent } from 'src/layouts/dashboard';

import { useTable, getComparator } from 'src/components/table';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import DemarcheTaskList from '../demarche-tasks-list';
import DemarcheFilterView from '../demarche-filter-view';
import DemarchEmployesList from '../demarche-employes-list';

export default function DemarchePageView({ employes }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const defaultShowOld = queryParams.get('not_visible') === 'true';

  const [showOld, setShowOld] = useState(defaultShowOld);

  const table = useTable({ defaultOrderBy: 'startDate' });

  const handleShowOldEmployes = async () => {
    const newShowOld = !showOld;
    await setShowOld(newShowOld);

    const params = new URLSearchParams(location.search);

    if (newShowOld) {
      params.set('not_visible', 'true');
      console.log('To go');
    } else {
      params.delete('not_visible');
      console.log('To back');
    }

    navigate(
      {
        pathname: location.pathname,
        search: params.toString(),
      },
      { replace: true }
    );
  };

  const filters = useSetState({
    companies: [],
    name: '',
  });

  const filteredData = applyFilter({
    inputData: employes,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Suivi des démarches RH"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Gestion RH', href: paths.dashboard.gestionRh.root },
          { name: 'Démarches RH' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Box sx={{ p: 2 }}>
        <DemarcheFilterView
          filters={filters}
          onResetPage={table.onResetPage}
          options={{
            companies: ['Entreprise 1', 'Entreprise 2'],
          }}
        />
      </Box>
      <Grid container spacing={2}>
        <Grid xs={12} md={4}>
          <DemarchEmployesList
            handleOld={handleShowOldEmployes}
            show={showOld}
            data={filteredData}
            setSelected={setSelected}
          />
        </Grid>
        <Grid xs={12} md={8}>
          <DemarcheTaskList
            tasks={selected?.tasks}
            onTaskSelect={(task) => console.log('Selected for work:', task)}
            onTaskComplete={console.log('Completed')}
            employeId={selected?.id}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}

function applyFilter({ inputData, comparator, filters }) {
  const { name, companies } = filters;

  // Sorting
  const stabilizedThis = inputData.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  inputData = stabilizedThis.map((el) => el[0]);

  // Filter by entreprise name
  if (companies.length) {
    inputData = inputData.filter((conge) => companies.includes(conge.entreprise.name));
  }
  if (name) {
    inputData = inputData.filter(
      (row) => row.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  return inputData;
}
