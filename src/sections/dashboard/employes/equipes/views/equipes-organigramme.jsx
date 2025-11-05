import { useTheme } from '@emotion/react';
import React, { useState, useCallback } from 'react';

import {
  Card,
  Menu,
  Table,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  IconButton,
  CardContent,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { OrganizationalChart } from 'src/components/organizational-chart';

import { SIMPLE_DATA } from './data';
import { SimpleNode } from './simple-node';

export default function EquipesOrganigramme() {
  const theme = useTheme();

  const route = useRouter()

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isOpen, setOpen] = useState(null);
  const handleSelect = (node) => {
    // only allow selection for teams
    if (node.role === 'Équipe') {
      setSelectedTeam(node);
    }
  };

  const handleOpen = useCallback((event) => {
    setOpen(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Organigramme"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Equipe', href: paths.dashboard.equipes.root },
          { name: 'Organigramme' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
        action={
          <>
            <IconButton variant="outlined" onClick={handleOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
            <Menu id="simple-menu" anchorEl={isOpen} onClose={handleClose} open={!!isOpen}>
             <MenuItem>Exporter en PDF</MenuItem>
             <MenuItem onClick={()=>route.push(paths.dashboard.equipes.root)}>Créez ou modifier vos équipes</MenuItem>
            </Menu>
          </>
        }
      />

      <Scrollbar
        sx={{
          p: 3,
          borderRadius: 1,
          border: `solid 1px ${theme.vars.palette.divider}`,
        }}
      >
        <OrganizationalChart
          data={SIMPLE_DATA}
          lineColor={theme.vars.palette.primary.light}
          nodeItem={(props) => <SimpleNode {...props} onClick={() => handleSelect(props)} />}
        />
      </Scrollbar>

      {selectedTeam && (
        <Card sx={{ mt: 5 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Employés de {selectedTeam.name}
            </Typography>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Rôle</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedTeam.children
                  .filter((child) => child.role === 'Employé')
                  .map((emp) => (
                    <TableRow key={emp.id}>
                      <TableCell>{emp.name}</TableCell>
                      <TableCell>{emp.role}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </DashboardContent>
  );
}
