import { Card, CardContent, CardHeader } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { ChartSelect } from 'src/components/chart';
import { ChartLine } from '../chart-line';

export default function DepartArrivesChart() {
  const [selectedSeries, setSelectedSeries] = useState('2023');
  const handleChangeSeries = useCallback((newValue) => {
    setSelectedSeries(newValue);
  }, []);
  return (
    <Card>
      <CardHeader
        title="Départs et arrivées"
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
            series: [{ name: 'Series A', data: [32, 40, 28, -42, 64, 72, 56, 80, 100] }],
          }}
        />
      </CardContent>
    </Card>
  );
}
