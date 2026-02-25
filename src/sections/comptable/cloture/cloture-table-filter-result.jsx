import { useCallback } from 'react';

import Chip from '@mui/material/Chip';

import { fDate } from 'src/utils/format-time';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

// ----------------------------------------------------------------------

const statusLabels = {
  all: 'Tous',
  draft: 'Brouillon',
  pending: 'En attente',
  validated: 'Validée',
  exported: 'Exportée',
};

export function ClotureTableFilterResult({ filters, totalResults, onResetPage, sx }) {
  const handleRemoveEntreprise = useCallback(() => {
    onResetPage();
    filters.setState({ entreprise: '' });
  }, [filters, onResetPage]);

  const handleRemoveStatus = useCallback(() => {
    onResetPage();
    filters.setState({ status: 'all' });
  }, [filters, onResetPage]);

  const handleRemovePeriod = useCallback(() => {
    onResetPage();
    filters.setState({ period: null });
  }, [filters, onResetPage]);

  const handleRemoveEmploye = useCallback(() => {
    onResetPage();
    filters.setState({ employe: '' });
  }, [filters, onResetPage]);

  const handleReset = useCallback(() => {
    onResetPage();
    filters.onResetState();
  }, [filters, onResetPage]);

  return (
    <FiltersResult totalResults={totalResults} onReset={handleReset} sx={sx}>
      <FiltersBlock label="Entreprise:" isShow={!!filters.state.entreprise}>
        <Chip
          {...chipProps}
          label={filters.state.entreprise}
          onDelete={handleRemoveEntreprise}
        />
      </FiltersBlock>

      <FiltersBlock label="Statut:" isShow={filters.state.status !== 'all'}>
        <Chip
          {...chipProps}
          label={statusLabels[filters.state.status] || filters.state.status}
          onDelete={handleRemoveStatus}
        />
      </FiltersBlock>

      <FiltersBlock label="Période:" isShow={!!filters.state.period}>
        <Chip
          {...chipProps}
          label={filters.state.period ? fDate(filters.state.period, 'MMMM yyyy') : ''}
          onDelete={handleRemovePeriod}
        />
      </FiltersBlock>

      <FiltersBlock label="Employé:" isShow={!!filters.state.employe}>
        <Chip
          {...chipProps}
          label={filters.state.employe}
          onDelete={handleRemoveEmploye}
        />
      </FiltersBlock>
    </FiltersResult>
  );
}
