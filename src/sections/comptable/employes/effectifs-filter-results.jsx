import React from 'react';

import { Chip } from '@mui/material';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

export default function EffectifsFilterResults({ filters, totalResults, sx }) {
    const handleRemoveEntreprise = () => {
        filters.setState({ entreprise: 'all' });
    };
    const handleRemoveName = () => {
        filters.setState({ name: '' });
    };
    const handleRemoveActif = () => {
        filters.setState({ actif: 'all' });
    };
    const handleRemoveCollege = () => {
        filters.setState({ college: 'all' });
    };
    const handleRemoveType = () => {
        filters.setState({ type: 'all' });
    };

    return (
        <FiltersResult totalResults={totalResults} onReset={filters.onResetState} sx={sx}>
            <FiltersBlock label="Entreprise:" isShow={filters.state.entreprise !== 'all'}>
                <Chip {...chipProps} label={filters.state.entreprise} onDelete={handleRemoveEntreprise} />
            </FiltersBlock>
            <FiltersBlock label="Nom:" isShow={!!filters.state.name}>
                <Chip {...chipProps} label={filters.state.name} onDelete={handleRemoveName} />
            </FiltersBlock>
            <FiltersBlock label="Actif:" isShow={filters.state.actif !== 'all'}>
                <Chip {...chipProps} label={filters.state.actif} onDelete={handleRemoveActif} />
            </FiltersBlock>
            <FiltersBlock label="Collège:" isShow={filters.state.college !== 'all'}>
                <Chip {...chipProps} label={filters.state.college} onDelete={handleRemoveCollege} />
            </FiltersBlock>
            <FiltersBlock label="Type:" isShow={filters.state.type !== 'all'}>
                <Chip {...chipProps} label={filters.state.type} onDelete={handleRemoveType} />
            </FiltersBlock>
        </FiltersResult>
    );
}
