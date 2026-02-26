import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

const STATUS_OPTIONS = {
  pending: { label: 'En attente', color: 'warning' },
  approved: { label: 'Validée', color: 'info' },
  rejected: { label: 'Refusée', color: 'error' },
  paid: { label: 'Payée', color: 'success' },
};

export default function PrimesTableRow({ row, onUpdateStatus }) {
  const popover = usePopover();

  const { employe, entreprise, typeLabel, amount, period, status, description, createdAt } = row;

  const statusConfig = STATUS_OPTIONS[status] || STATUS_OPTIONS.pending;

  const formatPeriod = (periodStr) => {
    if (!periodStr) return '-';
    const [year, month] = periodStr.split('-');
    const months = [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre',
    ];
    return `${months[parseInt(month, 10) - 1]} ${year}`;
  };

  return (
    <TableRow hover>
      <TableCell>
        <ListItemText
          primary={
            <Typography variant="subtitle2" noWrap>
              {employe.name}
            </Typography>
          }
          secondary={
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography variant="caption" color="text.secondary">
                {employe.poste}
              </Typography>
              <Typography variant="caption" color="text.disabled">
                •
              </Typography>
              <Typography variant="caption" color="text.disabled">
                {entreprise.name}
              </Typography>
            </Stack>
          }
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{ component: 'span' }}
        />
      </TableCell>

      <TableCell>
        <Chip label={typeLabel} size="small" variant="soft" />
      </TableCell>

      <TableCell>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {fCurrency(amount)}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2">{formatPeriod(period)}</Typography>
        <Typography variant="caption" color="text.secondary">
          Créée le {fDate(createdAt)}
        </Typography>
      </TableCell>

      <TableCell>
        <Label variant="soft" color={statusConfig.color}>
          {statusConfig.label}
        </Label>
      </TableCell>
    </TableRow>
  );
}
