import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { Iconify } from 'src/components/iconify';

const STATUS_LABELS = {
  pending: 'En attente',
  approved: 'Validée',
  rejected: 'Refusée',
  paid: 'Payée',
};

export function PrimesFilterResult({ filters, totalResults, onResetPage, sx }) {
  const { state: currentFilters, setState: updateFilters, resetState: resetFilters } = filters;

  const handleRemoveEntreprise = useCallback(() => {
    onResetPage();
    updateFilters({ entreprise: '' });
  }, [onResetPage, updateFilters]);

  const handleRemoveStatus = useCallback(() => {
    onResetPage();
    updateFilters({ status: '' });
  }, [onResetPage, updateFilters]);

  const handleRemoveType = useCallback(() => {
    onResetPage();
    updateFilters({ type: '' });
  }, [onResetPage, updateFilters]);

  const handleRemoveName = useCallback(() => {
    onResetPage();
    updateFilters({ name: '' });
  }, [onResetPage, updateFilters]);

  const handleRemovePeriod = useCallback(() => {
    onResetPage();
    updateFilters({ period: '' });
  }, [onResetPage, updateFilters]);

  const handleResetAll = useCallback(() => {
    onResetPage();
    resetFilters();
  }, [onResetPage, resetFilters]);

  const hasFilters =
    currentFilters.entreprise ||
    currentFilters.status ||
    currentFilters.type ||
    currentFilters.name ||
    currentFilters.period;

  if (!hasFilters) {
    return null;
  }

  return (
    <Stack spacing={1.5} sx={{ ...sx }}>
      <Box sx={{ typography: 'body2' }}>
        <strong>{totalResults}</strong>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.5 }}>
          résultats trouvés
        </Box>
      </Box>

      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        {currentFilters.entreprise && (
          <Block label="Entreprise :">
            <Chip
              size="small"
              label={currentFilters.entreprise}
              onDelete={handleRemoveEntreprise}
            />
          </Block>
        )}

        {currentFilters.status && (
          <Block label="Statut :">
            <Chip
              size="small"
              label={STATUS_LABELS[currentFilters.status] || currentFilters.status}
              onDelete={handleRemoveStatus}
            />
          </Block>
        )}

        {currentFilters.type && (
          <Block label="Type :">
            <Chip size="small" label={currentFilters.type} onDelete={handleRemoveType} />
          </Block>
        )}

        {currentFilters.name && (
          <Block label="Recherche :">
            <Chip size="small" label={currentFilters.name} onDelete={handleRemoveName} />
          </Block>
        )}

        {currentFilters.period && (
          <Block label="Période :">
            <Chip size="small" label={currentFilters.period} onDelete={handleRemovePeriod} />
          </Block>
        )}

        <Button
          color="error"
          onClick={handleResetAll}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          Réinitialiser
        </Button>
      </Stack>
    </Stack>
  );
}

function Block({ label, children, sx, ...other }) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={1}
      direction="row"
      sx={{
        p: 1,
        borderRadius: 1,
        overflow: 'hidden',
        borderStyle: 'dashed',
        ...sx,
      }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'subtitle2' }}>
        {label}
      </Box>

      <Stack spacing={1} direction="row" flexWrap="wrap">
        {children}
      </Stack>
    </Stack>
  );
}
