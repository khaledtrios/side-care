import React, { useState, useCallback } from 'react';

import Link from '@mui/material/Link';
import {
  Box,
  Card,
  Stack,
  Table,
  Button,
  Select,
  MenuItem,
  TableRow,
  MenuList,
  TableBody,
  TableCell,
  InputLabel,
  CardHeader,
  IconButton,
  FormControl,
  ListItemText,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate, today } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { TableEmptyRows, TableHeadCustom } from 'src/components/table';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import EquipesItem from '../equipes-item';
import EditEquipeModal from '../edit-equipe-modal';

const EquipesExample = [
  {
    id: 0,
    name: 'PO',
    entreprise: 'Portorium Consulting',
    employes: ['1', '2'],
  },
  {
    id: 1,
    name: 'Comptable',
    entreprise: 'Option 2',
    employes: [],
  },
];

const EmployesWithoutEquipes = [
  {
    id: 0,
    name: 'AEA Farid',
    entreprise: 'Portorium Consulting',
    manager: 'Jon Doe',
    contract: {
      startDate: today(),
      endDate: today(),
    },
  },
  {
    id: 1,
    name: 'Jane Doe',
    entreprise: 'Portorium Consulting',
    manager: 'Jon Doe',
    contract: {
      startDate: today(),
      endDate: null,
    },
  },
];

const TABLE_HEAD = [
  { id: 'employe', label: 'Employé' },
  { id: 'manager', label: 'Manager' },
  { id: 'equipes', label: 'Equipe' },
  { id: 'startDate', label: 'Début de contrat' },
  { id: 'endDate', label: 'Fin de contrat' },
];
export default function EquipesListView() {
  const [company, setCompany] = useState('Toutes');

  const route = useRouter()

  const popover = usePopover();

  const add = useBoolean();

  const [teams, setTeams] = useState(EquipesExample);
  const [employes, setEmployes] = useState(EmployesWithoutEquipes);

  const notFound = !employes.length;

  const handleChangeCompany = useCallback(
    (event) => {
      setCompany(event.target.value);
      if (company && event.target.value === 'Toutes') {
        setTeams(EquipesExample);
        setEmployes(EmployesWithoutEquipes);
      } else {
        setTeams(EquipesExample.filter((team) => team.entreprise === event.target.value));
        setEmployes(EmployesWithoutEquipes.filter((emp) => emp.entreprise === event.target.value));
      }
    },
    [company]
  );

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Équipes"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Equipe', href: paths.dashboard.equipes.root },
            { name: 'Liste' },
          ]}
          action={
            <Stack display="flex" gap={2} alignItems="center" flexDirection="row">
              <Button
                onClick={add.onTrue}
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                color="primary"
              >
                Ajouter
              </Button>
              <IconButton onClick={popover.onOpen}>
                <Iconify icon="eva:more-vertical-fill" />
              </IconButton>
            </Stack>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Stack
          spacing={3}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-end', sm: 'center' }}
          direction={{ xs: 'column', sm: 'row' }}
          mb={3}
        >
          <FormControl sx={{ width: 300 }}>
            <InputLabel htmlFor="entreprise-picker">Entreprise</InputLabel>
            <Select
              value={company}
              label="Entreprise"
              onChange={handleChangeCompany}
              inputProps={{ id: 'entreprise-picker' }}
            >
              <MenuItem value="Toutes">Toutes</MenuItem>
              {['Portorium Consulting', 'Option 2', 'Option 1'].map((opt) => (
                <MenuItem value={opt}>{opt}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        {!teams.length && <EmptyContent />}
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
          mb={3}
        >
          {teams.map((team) => (
            <EquipesItem team={team} />
          ))}
        </Box>

        <Card>
          <CardHeader sx={{ pb: 3 }} title="Les employés sans équipe assignée" />
          <Table sx={{ minWidth: 800 }}>
            <TableHeadCustom headLabel={TABLE_HEAD} />
            <TableBody>
              {employes.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>
                    <ListItemText
                      sx={{ mb: 1 }}
                      primary={
                        <Link
                          component={RouterLink}
                          href={paths.dashboard.employes.view(emp.id)}
                          color="inherit"
                        >
                          {emp.name}
                        </Link>
                      }
                      secondary={emp.entreprise}
                      primaryTypographyProps={{ typography: 'subtitle1' }}
                      secondaryTypographyProps={{
                        mt: 1,
                        component: 'span',
                        typography: 'caption',
                        color: 'text.disabled',
                      }}
                    />
                  </TableCell>
                  <TableCell>{emp.manager}</TableCell>
                  <TableCell>/</TableCell>
                  <TableCell>{fDate(emp.contract.startDate)}</TableCell>
                  <TableCell>{fDate(emp.contract?.endDate) || '-'}</TableCell>
                </TableRow>
              ))}
              <TableEmptyRows height={20} emptyRows={notFound} />
            </TableBody>
          </Table>
        </Card>
      </DashboardContent>
      <EditEquipeModal open={add.value} onClose={add.onFalse} />

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'top-center' } }}
      >
        <MenuList>
          <MenuItem onClick={()=>route.push(paths.dashboard.equipes.org)}>Voir l&apos;organigramme</MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}
