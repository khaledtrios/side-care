import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import { fDateRangeShortLabel } from 'src/utils/format-time';

import { varAlpha } from 'src/theme/styles';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

// ----------------------------------------------------------------------

export function CalendarFiltersResult({ filters, totalResults, sx }) {


  const handleRemoveDate = useCallback(() => {
    filters.setState({ startDate: null, endDate: null });
  }, [filters]);

  const handleRemoveEntreprise = useCallback(() => {
  filters.setState({ entreprise: '' });
}, [filters]);

const handleRemoveEventType = useCallback(() => {
  filters.setState({ eventType: '' });
}, [filters]);


  return (
    <FiltersResult totalResults={totalResults} onReset={filters.onResetState} sx={sx}>
      

      <FiltersBlock
        label="Date:"
        isShow={Boolean(filters.state.startDate && filters.state.endDate)}
      >
        <Chip
          {...chipProps}
          label={fDateRangeShortLabel(filters.state.startDate, filters.state.endDate)}
          onDelete={handleRemoveDate}
        />
      </FiltersBlock>

      <FiltersBlock label="Entreprise:" isShow={Boolean(filters.state.entreprise)}>
  <Chip
    {...chipProps}
    label={filters.state.entreprise}
    onDelete={handleRemoveEntreprise}
  />
</FiltersBlock>

<FiltersBlock label="Type d'événement:" isShow={Boolean(filters.state.eventType)}>
  <Chip
    {...chipProps}
    label={
      {
        birth_date: 'Anniversaire',
        startDate: 'Arrivée',
        startDate_birthday: 'Anniversaire professionnel',
        end_date: 'Départ',
        trial_period_end_date: "Fin de période d'essai",
        trial_period_renewal_end_date: 'Fin de 2ème période d’essai',
        employee_interview: 'Entretien',
      }[filters.state.eventType]
    }
    onDelete={handleRemoveEventType}
  />
</FiltersBlock>

    </FiltersResult>
  );
}
