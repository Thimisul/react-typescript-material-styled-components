//React 
import React, { useState, useEffect } from 'react';
//Imports Material-UI
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
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
import { jsonCashiersFaker } from './testCashier'
//Controlar o Form
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Chip, Divider, IconButton } from '@mui/material';
import { ServicesSaloonInterface } from '../ServicesSaloon';

//Interfaces
//Cadastro de Serviços Nome, Duração, Valor


export interface CashiersSaloonInterface {
  id: string;
  name: string,
  service: string,
  price: string,
  date: Date,
  isPaidOut: boolean
}


const CashiersSaloon = () => {
  //react-hook-form
  const { handleSubmit, formState: { errors }, control, reset } = useForm<CashiersSaloonInterface>();
  //Mostrar Formulário
  const [showForm, setShowForm] = useState<Boolean>(false);
  //State da Lista de Usuários Cadastrados
  const [listCashiers, setCashiers] = useState<CashiersSaloonInterface[]>([])
  const [total, setTotal] = useState<Number>(0)
  //Recebe json para carregamento da lista na página
  useEffect(() => {
    setCashiers(JSON.parse(jsonCashiersFaker()));
    console.log(listCashiers)
  }, [])


  //Salva Usuário na Lista e da um reset no form
  const onSubmit: SubmitHandler<CashiersSaloonInterface> = data => {
    setShowForm(false);
    setCashiers(state => [data, ...state])
    reset();
  };


  return (
    <Container>
      <Paper sx={{ p: 1, mt: 1 }}>
        <Typography variant='h4' color='primary' gutterBottom>Caixa</Typography>
      </Paper>

      {/* <Button sx={{ mt: 2 }} variant='contained' onClick={() => setShowForm(true)}>Adicionar um Novo Serviço</Button>

      {showForm && <Paper sx={{ p: 2 }}>

        <Typography variant='h4' color='primary' gutterBottom>Cadastro de Serviço</Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>

          <Grid container spacing={2}>



          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cadastrar
          </Button>

        </Box>



      </Paper>
      } */}

      <Box>
        <Divider />
        <Typography mt={3} variant={'h4'}>Lista de Contas</Typography>
        <Table size="small">

          <TableHead>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell>Servico</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Situação</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listCashiers?.map((agreement) => (
              agreement?.name &&
              <TableRow key={agreement.name}>
                <TableCell>{agreement.name}</TableCell>
                <TableCell>{agreement.service}</TableCell>
                <TableCell>{agreement.date.toLocaleString('pt-BR', { year: 'numeric', month: 'numeric', day: 'numeric' })}</TableCell>
                <TableCell>{agreement.price}</TableCell>
                {agreement.isPaidOut ?
                  <>
                    <TableCell>
                      <Chip sx={{ m: 1 }} color="primary"
                        label='Pago' />
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <AttachMoneyOutlinedIcon />
                      </IconButton>
                    </TableCell>
                  </>
                  :
                  <>
                    <TableCell>Em Aberto</TableCell>
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