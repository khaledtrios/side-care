import { Card, CardContent, CardHeader } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { TYPE_CONTRACT } from 'src/_mock/_employes';
import { ChartPie } from '../chart-pie';

export default function GenderReparationChart({options}) {
  
  return (
    <Card>
      <CardHeader
        title="Proportion Femme / Homme"
      />

      <CardContent>
      <ChartPie
        chart={{
          categories: ['Femme', 'Homme'],
          series: [options.female, options.male],
        }}
      />
      </CardContent>
    </Card>
  );
}
