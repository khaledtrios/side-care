import { useCallback } from 'react';

import Chip from '@mui/material/Chip';

import { fDateRangeShortLabel } from 'src/utils/format-time';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

// ----------------------------------------------------------------------

export function CompteurFilterResult({ filters, totalResults, onResetPage, sx }) {
  const handleRemoveKeyword = useCallback(() => {
    onResetPage();
    filters.setState({ name: '' });
  }, [filters, onResetPage]);

  const handleRemoveService = useCallback(
    () => {
     onResetPage();
    filters.setState({ entreprise: '' });
    },
    [filters, onResetPage]
  );

 
  return (
    <FiltersResult totalResults={totalResults} onReset={filters.onResetState} sx={sx}>
      <FiltersBlock label="Entreprise:" isShow={!!filters.state.entreprise}>
        
          <Chip {...chipProps} label={filters.state.entreprise} onDelete={handleRemoveService} />
   
      </FiltersBlock>



      <FiltersBlock label="Nom et prénom:" isShow={!!filters.state.name}>
        <Chip {...chipProps} label={filters.state.name} onDelete={handleRemoveKeyword} />
      </FiltersBlock>
    </FiltersResult>
  );
}
