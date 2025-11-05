import React, { useCallback } from 'react';

import { Chip } from '@mui/material';

import { fDateRangeShortLabel } from 'src/utils/format-time';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

export default function EntretienTableFilterResult({ totalResults, filters, sx, onResetPage }) {

  const handleRemoveDate = useCallback(() => {
    onResetPage();
    filters.setState({ startDate: null, endDate: null });
  }, [filters, onResetPage]);

  return (
    <FiltersResult totalResults={totalResults} onReset={filters.onResetState} sx={sx}>

      <FiltersBlock
        label="Période:"
        isShow={Boolean(filters.state.startDate && filters.state.endDate)}
      >
        <Chip
          {...chipProps}
          label={fDateRangeShortLabel(filters.state.startDate, filters.state.endDate)}
            onDelete={handleRemoveDate}
        />
      </FiltersBlock>
    </FiltersResult>
  );
}
