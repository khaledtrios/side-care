import React, { useState, useCallback } from 'react';

import { Card, CardHeader, CardContent } from '@mui/material';

import { ChartSelect } from 'src/components/chart';

import { ChartLine } from '../chart-line';

export default function NombreSalarieChart() {
  const [selectedSeries, setSelectedSeries] = useState('2023');
  const handleChangeSeries = useCallback((newValue) => {
    setSelectedSeries(newValue);
  }, []);
  return (
    <Card>
      <CardHeader
        title="Evolution du nombre de salariés"
        action={
          <ChartSelect
            options={[2025, 2024].map((item) => item)}
            value={selectedSeries}
            onChange={handleChangeSeries}
          />
        }
      />

      <CardContent>
        <ChartLine
          chart={{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            series: [{ name: 'Series A', data: [32, 40, 28, 42, 64, 72, 56, 80, 100] }],
          }}
        />
      </CardContent>
    </Card>
  );
}
