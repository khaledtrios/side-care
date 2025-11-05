import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export function JobItem({ job, onView, onEdit, onDelete }) {
  const popover = usePopover();

  return (
    <Card>
        <Stack flexDirection='row' sx={{ position: 'absolute', top: 8, right: 8 }}>
          <IconButton LinkComponent={RouterLink} onClick={onEdit}>
            <Iconify icon="material-symbols:edit" />
          </IconButton>
          <IconButton LinkComponent={RouterLink} href={paths.dashboard.entreprise.view(job.id)}>
            <Iconify icon="mdi:eye" />
          </IconButton>
        </Stack>

        <Stack sx={{ p: 3, pb: 2 }}>
          <Avatar
            alt={job.name}
            src={job.logo}
            variant="rounded"
            sx={{ width: 48, height: 48, mb: 2 }}
          />

          <ListItemText
            sx={{ mb: 1 }}
            primary={
              <Link
                component={RouterLink}
                // href={paths.dashboard.job.details(job.id)}
                color="inherit"
              >
                {job.name}
              </Link>
            }
            secondary={`Date de création: ${fDate(job.createdAt)}`}
            primaryTypographyProps={{ typography: 'subtitle1' }}
            secondaryTypographyProps={{
              mt: 1,
              component: 'span',
              typography: 'caption',
              color: 'text.disabled',
            }}
          />

          <Stack
            spacing={0.5}
            direction="row"
            alignItems="center"
            sx={{ color: 'primary.main', typography: 'caption' }}
          >
            <Iconify width={16} icon="solar:users-group-rounded-bold" />
            {job.employes} employées
          </Stack>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box rowGap={1.5} display="grid" gridTemplateColumns="repeat(1, 1fr)" sx={{ p: 3 }}>
          {[
            {
              label: job.admin,
              icon: <Typography variant='caption'>Administrée par :</Typography>
            },
            {
              label: job.cabinet,
              icon: <Typography variant='caption'>Cabinet d’expert comptable :</Typography>
            },
            {
              label: job.siret,
              icon: <Typography variant='caption'>Siret :</Typography>
            },
          ].map((item) => (
            <Stack
              key={item.label}
              spacing={0.5}
              flexShrink={0}
              direction="row"
              alignItems="center"
              sx={{ color: 'text.disabled', minWidth: 0 }}
            >
              {item.icon}
              <Typography variant="caption" noWrap>
                {item.label}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Card>
  );
}
