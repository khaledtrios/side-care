import { Card, CardContent, CardHeader } from '@mui/material';
import React from 'react';
import { COLLEGE } from 'src/_mock/_employes';
import { ChartPie } from '../chart-pie';

export default function ReparationCollege() {
  return (
    <Card>
      <CardHeader title="Répartition par type de collège" />
      <CardContent>
        <ChartPie
          chart={{
            categories: COLLEGE,
            series: [13, 43],
          }}
        />
      </CardContent>
    </Card>
  );
}
