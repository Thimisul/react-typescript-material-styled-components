//React 
import React, { useState, useEffect } from 'react';
//Imports Material-UI
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Container from '@mui/material/Container';
//Material Icons
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import MoneyOffCsredOutlinedIcon from '@mui/icons-material/MoneyOffCsredOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
//Importar json Fake para testes
//Controlar o Form
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Chip, Divider, IconButton } from '@mui/material';
import { getCashiers } from '../../services/cashiers';
import CashiersType from '../../models/cashiers';

//Interfaces
//Cadastro de Serviços Nome, Duração, Valor


const CashiersSaloon = () => {
  const [showForm, setShowForm] = useState<Boolean>(false);
  const [listCashiers, setListCashiers] = useState<CashiersType[]>([])
  const [total, setTotal] = useState<Number>(0)
  
  useEffect(() => {
    getCashiers().then((cashiers) => setListCashiers(cashiers.reverse()));
  }, [])

  return (
    <Container>
      <Paper sx={{ p: 1, mt: 1 }}>
        <Typography variant='h4' color='primary' gutterBottom>Caixa</Typography>
      </Paper>

      <Box>
        <Divider />
        <Typography mt={3} variant={'h4'}>Lista de Contas</Typography>
        <Table size="small">

          <TableHead>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell>Servico</TableCell>
              <TableCell>Data Serviço</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Situação</TableCell>
              <TableCell>Data Pagamento</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listCashiers?.map((cashier) => (
              <TableRow key={cashier?.id}>
                <TableCell>{cashier.schedule.client.name}</TableCell>
                <TableCell>{cashier.schedule.service.name}</TableCell>
                <TableCell>{new Date(cashier.schedule.end!).toLocaleDateString()}</TableCell>
                <TableCell>{cashier.price}</TableCell>
                {cashier.date ?
                  <>
                    <TableCell>
                      <Chip sx={{ m: 1 }} color="primary"
                        label='Pago' />
                    </TableCell>
                    <TableCell>{new Date(cashier.date!).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <IconButton>
                        <AttachMoneyOutlinedIcon />
                      </IconButton>
                    </TableCell>
                  </>
                  :
                  <>
                    <TableCell>{cashier.status}</TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <IconButton>
                        <AttachMoneyOutlinedIcon color="primary" />
                      </IconButton>
                    </TableCell>
                  </>}

              </TableRow>
            ))}
          </TableBody>

        </Table>
      </Box>
      <Paper sx={{ pl: 2, mt: 2 }}>
        <Grid container spacing={1}>

          <Grid item xs={6} md={8}>
            <Typography color="primary" variant="h6">Valores a Receber: </Typography> R$: 200,00
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography color="primary" variant="h6"> Valores Recebidos: </Typography> R$: 10.000,00
          </Grid>

        </Grid >
      </Paper>

    </Container >
  );
}

export default CashiersSaloon;