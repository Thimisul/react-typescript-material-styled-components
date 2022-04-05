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
//Importar json Fake para testes
import { jsonClientsFaker } from './testeClientes'
//Controlar o Form
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

//Interfaces

interface IFormInputs {
  name: string
  gender: string
}


const Clients = () => {
  //react-hook-form
  const { handleSubmit, formState: { errors }, control, reset } = useForm<IFormInputs>();
  //Mostrar Formulário
  const [showForm, setShowForm] = useState<Boolean>(false);
  //State da Lista de Usuários Cadastrados
  const [listClients, setListClients] = useState<IFormInputs[]>([])
  //Recebe json para carregamento da lista na página
  useEffect(() => {
    setListClients(JSON.parse(jsonClientsFaker()));
  }, [])
  //Salva Usuário na Lista e da um reset no form
  const onSubmit: SubmitHandler<IFormInputs> = data => {
    setShowForm(false);
    setListClients(state => [data, ...state])
    reset();
  };


  return (
    <Container>

      <Button sx={{ mt: 2 }} variant='contained' onClick={() => setShowForm(true)}>Adicionar um Novo Cliente</Button>

      {showForm && <Paper sx={{ p: 2 }}>

        <Typography variant='h3' color='primary' gutterBottom>Cadastro de Cliente</Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>

          <Grid container spacing={2}>

            <Grid item xs={6}>
              <Controller
                name="name"
                defaultValue=''
                control={control}
                rules={{ required: true }}
                render={({ field }) => <TextField fullWidth {...field} label='Nome' />}
              />
              {errors.name?.type === 'required' &&
                <Typography variant='inherit' color={'tomato'} >* Nome deve ser preenchido</Typography>}
            </Grid>

            <Grid item xs={6} >
              <Controller
                name="gender"
                defaultValue=''
                control={control}
                rules={{ required: true }}
                render={({ field }) => <TextField fullWidth {...field} label='Genero' />}
              />
              {errors.gender?.type === 'required' &&
                <Typography variant='inherit' color={'tomato'} >"Gender name is required"</Typography>}
            </Grid>

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
      }

      <Box>
        <Typography variant={'h4'}>Lista de Clientes</Typography>
        <Table size="medium">

          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {listClients?.map((client) => (
              client?.name &&
              <TableRow key={client.name}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.gender}</TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </Box>

    </Container>
  );
}

export default Clients;