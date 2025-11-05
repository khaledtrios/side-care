import { Card, CardContent, CardHeader } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { TYPE_CONTRACT } from 'src/_mock/_employes';
import { ChartPie } from '../chart-pie';

export default function TypeContractChart() {
  
  return (
    <Card>
      <CardHeader
        title="Répartition par type de contrat"
      />

      <CardContent>
      <ChartPie
        chart={{
          categories: TYPE_CONTRACT,
          series: [44, 55, 13, 43],
        }}
      />
      </CardContent>
    </Card>
  );
}
