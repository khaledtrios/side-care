import React from 'react';

import { Box, Card, Button, MenuList, MenuItem, CardHeader, ListItemText } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

export default function StarterPageView() {
  const popover = usePopover();
  const router = useRouter();
  const items = [
    {
      id: 1,
      title: 'Ajouter un employé',
      description:
        'Vous pouvez créer vos salariés sur la plateforme SideCare ou les importer via votre DSN ou un fichier Excel.',
      action: (
        <Button onClick={popover.onOpen} variant="outlined">
          Ajouter
        </Button>
      ),
      icon: <Iconify icon="mdi:user-plus-outline" sx={{ width: 36, height: 36 }} />,
    },
    {
      id: 2,
      title: 'Ajouter un administrateur',
      description:
        "Vous pouvez inviter d'autres personnes à rejoindre votre entreprise et à la gérer.",
      action: (
        <Button
          onClick={() => router.push(paths.salaries.parametres.admins.root)}
          variant="outlined"
        >
          Ajouter
        </Button>
      ),
      icon: <Iconify icon="mdi:user-plus-outline" sx={{ width: 36, height: 36 }} />,
    },
    {
      id: 3,
      title: 'Ajouter un expert-comptable',
      description:
        "Votre expert comptable et ses gestionnaires de paie ont un espace dédié qui leur permet d'avoir accès aux informations relatives à la paie et à la gestion des contrats d'assurance de vos entreprises.",
      action: (
        <Button
          onClick={() => router.push(paths.salaries.parametres.cabinets.root)}
          variant="outlined"
        >
          Ajouter
        </Button>
      ),
      icon: <Iconify icon="mdi:user-plus-outline" sx={{ width: 36, height: 36 }} />,
    },
    {
      id: 4,
      title: 'Paramétrer les emails',
      description: 'Vous pouvez activer ou désactiver les emails que vous souhaitez recevoir.',
      action: (
        <Button onClick={() => router.push(paths.salaries.account.root)} variant="outlined">
          Paramétrer
        </Button>
      ),
      icon: <Iconify icon="material-symbols:mail-outline" sx={{ width: 36, height: 36 }} />,
    },
    {
      id: 5,
      title: 'Paramétrer la sécurité',
      description:
        'Sécurisez votre compte SideCare en 2 clics. Renforcez rapidement la sécurité de votre compte grâce à une connexion en deux temps.',
      action: (
        <Button onClick={() => router.push(paths.salaries.account.root)} variant="outlined">
          Paramétrer
        </Button>
      ),
      icon: <Iconify icon="material-symbols:lock-outline" sx={{ width: 36, height: 36 }} />,
    },
    {
      id: 6,
      title: 'Paramétrer la photo de profil du compte',
      description: 'Personnalisez votre espace SideCare à l’image de votre entreprise.',
      action: (
        <Button onClick={() => router.push(paths.salaries.account.root)} variant="outlined">
          Paramétrer
        </Button>
      ),
      icon: <Iconify icon="material-symbols:image-outline" sx={{ width: 36, height: 36 }} />,
    },
    {
      id: 7,
      title: 'Activer les modules SIRH et de qualité de vie au travail',
      description:
        'Des modules et des conseils pour améliorer la qualité de vie au travail de vos salariés ainsi que la gestion de votre entreprise.',
      action: (
        <Button onClick={() => router.push(paths.salaries.parametres.root)} variant="outlined">
          Activer
        </Button>
      ),
      icon: <Iconify icon="mingcute:happy-line" sx={{ width: 36, height: 36 }} />,
    },
    {
      id: 7,
      title: 'Consultez notre FAQ',
      description:
        "C'est ici que vous trouverez les réponses à vos questions concernant tous les aspects de la plateforme SideCare.",
      action: <Button variant="outlined">Consulter</Button>,
      icon: <Iconify icon="material-symbols:help-outline" sx={{ width: 36, height: 36 }} />,
    },
  ];
  return (
    <>
      <DashboardContent>
        <Card>
          <CardHeader title="Actions" sx={{ mb: 1 }} />

          <Scrollbar sx={{ minHeight: 405 }}>
            <Box sx={{ minWidth: 640 }}>
              {items.map((item) => (
                <Item key={item.id} item={item} />
              ))}
            </Box>
          </Scrollbar>
        </Card>
      </DashboardContent>
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'top-center' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              popover.onClose();
              router.push(paths.salaries.employes.add);
            }}
          >
            <Iconify icon="mdi:user-add" />
            Créer un employé
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
              router.push(paths.salaries.employes.import);
            }}
          >
            <Iconify icon="solar:import-bold" />
            Importer mes employés via fichier excel
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}

function Item({ item, sx, ...other }) {
  return (
    <Box
      sx={{
        py: 2,
        px: 3,
        gap: 2,
        display: 'flex',
        alignItems: 'center',
        borderBottom: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
        ...sx,
      }}
      {...other}
    >
      {item.icon}

      <ListItemText
        primary={item.title}
        secondary={item.description}
        primaryTypographyProps={{ noWrap: true, typography: 'subtitle2' }}
        secondaryTypographyProps={{ mt: 0.5, noWrap: true, component: 'span' }}
      />

      <Box sx={{ flexShrink: 0, color: 'text.disabled', typography: 'caption' }}>{item.action}</Box>
    </Box>
  );
}
