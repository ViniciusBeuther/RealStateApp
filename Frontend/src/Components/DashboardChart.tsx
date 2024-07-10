import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DashboardChart: React.FC = () => {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const data = [
      { year: 2010, count: 10 },
      { year: 2011, count: 20 },
      { year: 2012, count: 15 },
      { year: 2013, count: 25 },
      { year: 2014, count: 22 },
      { year: 2015, count: 30 },
      { year: 2016, count: 28 },
    ];

    const ctx = document.getElementById('dashboardChartCanvas') as HTMLCanvasElement;

    if (ctx) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(row => row.year),
          datasets: [
            {
              label: 'Aquisições por ano',
              data: data.map(row => row.count),
              borderColor: '#00675E',
              backgroundColor: '#00B4A4',
              borderRadius: 10
            },
          ],
        },
      });
    }

    // Cleanup on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return <canvas className='bg-customWhite-100 rounded-lg shadow-lg' id="dashboardChartCanvas"></canvas>;
};

export default DashboardChart;
