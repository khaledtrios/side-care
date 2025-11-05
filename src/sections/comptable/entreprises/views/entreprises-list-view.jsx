import React, { useState } from 'react';

import { Box, Stack, Table, Button, TableBody } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useSetState } from 'src/hooks/use-set-state';

import { ComptableContent } from 'src/layouts/comptable';

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
  TableSelectedAction,
} from 'src/components/table';

import EntreprisesTableRow from '../entreprises-table-row';
import EntrepriseListTableToolbar from '../entreprises-list-table-toolbar';

const TABLE_HEAD = [
  { id: 'raison', label: 'Raison sociale' },
  { id: 'gestionnaire', label: 'Gestionnaire de paie' },
  { id: 'nbrEmployes', label: "Nombre d'employés" },
  { id: 'contact', label: 'Contact' },
];

const data = [
  {
    id: 1,
    raison: 'Entreprise A',
    siret: '123 456',
    gestionnaire: 'Gestionnaire 1',
    nbrEmployes: 50,
    contact: ['contact1@example.com', 'contact2@example.com'],
    garantie: true,
    anomalies: false,
    offreTrouvee: true,
    convention: '1',
    anneeDsn: '2024',
    employes: 50,
    clientSigned: 'true',
  },
];

export default function EntreprisesListView() {
  const table = useTable({ defaultOrderBy: 'date' });

  const [tableData, setTableData] = useState(data);

  const filters = useSetState({
    raison: '',
    garantie: null,
    anomalies: null,
    offreTrouvee: null,
    minEmp: null,
    convention: '',
    anneeDsn: '',
    clientSigned: '',
  });

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const canReset = Object.keys(filters).some((key) => filters[key] !== '' && filters[key] !== null);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  return (
    <ComptableContent>
      <CustomBreadcrumbs
        heading="Vos entreprises clientes"
        links={[
          { name: 'Tableau de bord', href: paths.comptable.root },
          { name: 'Entreprises', href: paths.comptable.entreprise.root },
        ]}
        action={
          <Stack direction="row" spacing={1}>
            <Button
              LinkComponent={RouterLink}
              href={paths.comptable.entreprise.add}
              color="primary"
              startIcon={<Iconify icon="eva:plus-fill" />}
              variant="contained"
            >
              Ajouter une nouvelle entreprise
            </Button>
            <Button color="primary" variant="outlined" LinkComponent={RouterLink} href={paths.comptable.entreprise.dsn}>
              Importer des DSN
            </Button>
          </Stack>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />
  
      <EntrepriseListTableToolbar
        filters={filters}
        onResetPage={table.onResetPage}
        options={{
          conventionList: [
            { value: '1', label: 'Accouvage et sélection avicoles' },
            { value: '2', label: 'Aide à domicile et services à la personne' },
            { value: '3', label: 'Agriculture et professions agricoles' },
            { value: '4', label: 'Animation' },
          ],
          anneeDsnList: [
            { value: '2024', label: '2024' },
            { value: '2023', label: '2023' },
            { value: '2022', label: '2022' },
          ],
        }}
      />

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
            />

            <TableBody>
              {dataFiltered
                .slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                )
                .map((row) => (
                  <EntreprisesTableRow
                    key={row.id}
                    row={row}
                    selected={table.selected.includes(row.id)}
                    onSelectRow={() => table.onSelectRow(row.id)}
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
    </ComptableContent>
  );
}

function applyFilter({ inputData, comparator, filters }) {
  const { raison, garantie, anomalies, offreTrouvee, minEmp, convention, anneeDsn, clientSigned } =
    filters.state; // Use filters.state to access the values

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (raison) {
    inputData = inputData.filter((item) =>
      item.raison.toLowerCase().includes(raison.toLowerCase())
    );
  }

  if (garantie !== null) {
    inputData = inputData.filter((item) => item.garantie === garantie);
  }

  if (anomalies !== null) {
    inputData = inputData.filter((item) => item.anomalies === anomalies);
  }

  if (offreTrouvee !== null) {
    inputData = inputData.filter((item) => item.offreTrouvee === offreTrouvee);
  }

  if (minEmp !== null && minEmp !== '') {
    inputData = inputData.filter((item) => item.nbrEmployes >= Number(minEmp));
  }

  // Only apply these filters if the data structure supports them
  if (convention) {
    inputData = inputData.filter((item) => item.convention === convention);
  }

  if (anneeDsn) {
    inputData = inputData.filter((item) => item.anneeDsn === anneeDsn);
  }

  if (clientSigned) {
    inputData = inputData.filter((item) => item.clientSigned === clientSigned);
  }

  return inputData;
}
