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
//Importar json Fake para testes
import { jsonServicesFaker } from './testServicesSaloon'
//Controlar o Form
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Divider, IconButton } from '@mui/material';

//Interfaces
//Cadastro de Serviços Nome, Duração, Valor
export interface ServicesSaloonInterface {
  id: string;
  name: string,
  duration: string,
  price: string
}


const ServicesSaloon = () => {
  //react-hook-form
  const { handleSubmit, formState: { errors }, control, reset } = useForm<ServicesSaloonInterface>();
  //Mostrar Formulário
  const [showForm, setShowForm] = useState<Boolean>(false);
  //State da Lista de Usuários Cadastrados
  const [listServices, setServices] = useState<ServicesSaloonInterface[]>([])
  //Recebe json para carregamento da lista na página
  useEffect(() => {
    setServices(JSON.parse(jsonServicesFaker()));
  }, [])
  //Salva Usuário na Lista e da um reset no form
  const onSubmit: SubmitHandler<ServicesSaloonInterface> = data => {
    setShowForm(false);
    setServices(state => [data, ...state])
    reset();
  };


  return (
    <Container>

      <Button sx={{ mt: 2 }} variant='contained' onClick={() => setShowForm(true)}>Adicionar um Novo Serviço</Button>

      {showForm && <Paper sx={{ p: 2 }}>

        <Typography variant='h4' color='primary' gutterBottom>Cadastro de Serviço</Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>

          <Grid container spacing={2}>


            <Controller
              name="name"
              defaultValue=''
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Grid item xs={8}> <TextField fullWidth {...field} label='Nome' /> </Grid>}
            />
            {errors.name?.type === 'required' &&
              <Typography variant='inherit' color={'tomato'} >* Nome deve ser preenchido</Typography>}

            <Controller
              name="duration"
              defaultValue=''
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Grid item xs={2}> <TextField fullWidth {...field} label='Duração' /> </Grid>}
            />
            {errors.name?.type === 'required' &&
              <Typography variant='inherit' color={'tomato'} >* Nome deve ser preenchido</Typography>}

            <Controller
              name="price"
              defaultValue=''
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Grid item xs={2}> <TextField fullWidth {...field} label='Valor' /> </Grid>}
            />
            {errors.name?.type === 'required' &&
              <Typography variant='inherit' color={'tomato'} >* Nome deve ser preenchido</Typography>}

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
        <Divider />
        <Typography mt={3} variant={'h4'}>Lista de Serviços</Typography>
        <Table size="small">

          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Duração</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {listServices?.map((service) => (
              service?.name &&
              <TableRow key={service.name}>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.duration} Minutos</TableCell>
                <TableCell>{service.price}</TableCell>
                <TableCell><IconButton><EditOutlinedIcon /></IconButton><IconButton><ClearOutlinedIcon /></IconButton></TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </Box>

    </Container >
  );
}

export default ServicesSaloon;