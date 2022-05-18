import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chart from 'react-apexcharts'
import React, { useState } from 'react';

const ChartPage = () => {

  const DefaultGraph = {
    options: {
      mode: 'dark',
      tooltip: {
        theme: 'dark'
      },
      fill: {
        colors: ['#f57c00', '##ffb74d', '#fafafa']
      },
      chart: {
        id: 'apexchart-example'
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    },
    series: [{
      name: 'Quantidade de serviços prestados',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }]
  }

  const [graph, setGraph] = useState(DefaultGraph)

  return (
    <Container>
      <Paper sx={{ p: 1, mt: 1 }}>
        <Typography variant='h4' color='primary' gutterBottom>Caixa</Typography>
      </Paper>

      <Chart sx={{ 'color': 'red' }} options={graph.options} series={graph.series} type="bar" width={500} height={320} />

    </Container >
  );
}

export default ChartPage;