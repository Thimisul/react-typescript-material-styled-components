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
import { jsonClientsFaker } from './testeClientes'
//Controlar o Form
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Divider, IconButton } from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


//Interfaces
// Nome, Data de Nascimento, CPF, Cidade, Estado, Rua, Cep, Número e Complemento

interface ClientInterface {
  cpf: string
  name: string
  birthday: Date
  cep: string
  street: string;
  number: string;
  district: string;
  city: string;
  complement: string
}


const Clients = () => {
  //react-hook-form
  const { handleSubmit, formState: { errors }, control, reset } = useForm<ClientInterface>();
  //Mostrar Formulário
  const [showForm, setShowForm] = useState<Boolean>(false);
  //State da Lista de Usuários Cadastrados
  const [listClients, setListClients] = useState<ClientInterface[]>([])

  //Recebe json para carregamento da lista na página
  useEffect(() => {
    setListClients(JSON.parse(jsonClientsFaker()));
  }, [])

  //Salva Usuário na Lista e da um reset no form
  const onSubmit: SubmitHandler<ClientInterface> = data => {
    console.log(data)
    setShowForm(false);
    setListClients(state => [data, ...state])
    reset();
  };

  const handleDeleteClient = (cpf: string) => {
    console.log("Delete: " + cpf)
    setListClients(listClients.filter(client => client.cpf !== cpf))
  }

  const handleEditClient = (cpf: string) => {
    console.log("Edit: " + cpf)
  }


  return (
    <Container>

      <Button sx={{ mt: 2 }} variant='contained' onClick={() => setShowForm(true)}>Adicionar um Novo Cliente</Button>

      {showForm && <Paper sx={{ p: 2 }}>

        <Typography variant='h4' color='primary' gutterBottom>Cadastro de Cliente</Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>

          <Grid container spacing={2}>

            <Controller
              name="cpf"
              defaultValue=''
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
                <Grid item xs={3}>
                  <TextField fullWidth {...field} label='CPF' />
                </Grid>
              }
            />
            {errors.name?.type === 'required' &&
              <Typography variant='inherit' color={'tomato'} >* Nome deve ser preenchido</Typography>}

            <Controller
              name="name"
              defaultValue=''
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
                <Grid item xs={6}>
                  <TextField fullWidth {...field} label='Nome' />
                </Grid>

              }
            />
            {errors.name?.type === 'required' &&
              <Typography variant='inherit' color={'tomato'} >* Nome deve ser preenchido</Typography>}

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Controller
                control={control}
                name="birthday"
                defaultValue={new Date(Date.now())}
                rules={{ required: true }} //optional
                render={({ field }) =>
                  <DatePicker {...field}
                    value={field.value}
                    renderInput={props =>
                      <Grid item xs={3} >
                        <TextField {...props} label='Data de Nascimento'></TextField>
                      </Grid>}
                  />
                }
              />
            </LocalizationProvider>

            <Controller
              name="cep"
              defaultValue=''
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
                <Grid item xs={2}>
                  <TextField fullWidth {...field} label='CEP' />
                </Grid>

              }
            />
            {errors.name?.type === 'required' &&
              <Typography variant='inherit' color={'tomato'} >* Nome deve ser preenchido</Typography>}

            <Controller
              name="street"
              defaultValue=''
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
                <Grid item xs={9}>
                  <TextField fullWidth {...field} label='Logradouro' />
                </Grid>

              }
            />
            {errors.name?.type === 'required' &&
              <Typography variant='inherit' color={'tomato'} >* Nome deve ser preenchido</Typography>}

            <Controller
              name="number"
              defaultValue=''
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
                <Grid item xs={1}>
                  <TextField fullWidth {...field} label='N' />
                </Grid>

              }
            />
            {errors.name?.type === 'required' &&
              <Typography variant='inherit' color={'tomato'} >* Nome deve ser preenchido</Typography>}

            <Controller
              name="district"
              defaultValue=''
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
                <Grid item xs={3}>
                  <TextField fullWidth {...field} label='Bairro' />
                </Grid>

              }
            />
            {errors.name?.type === 'required' &&
              <Typography variant='inherit' color={'tomato'} >* Nome deve ser preenchido</Typography>}

            <Controller
              name="city"
              defaultValue=''
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
                <Grid item xs={5}>
                  <TextField fullWidth {...field} label='Cidade' />
                </Grid>

              }
            />
            {errors.name?.type === 'required' &&
              <Typography variant='inherit' color={'tomato'} >* Nome deve ser preenchido</Typography>}

            <Controller
              name="complement"
              defaultValue=''
              control={control}
              rules={{ required: false }}
              render={({ field }) =>
                <Grid item xs={4}>
                  <TextField fullWidth {...field} label='Complemento' />
                </Grid>

              }
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
        <Typography mt={3} variant={'h4'}>Lista de Clientes</Typography>
        <Table size="small">

          <TableHead>
            <TableRow>
              <TableCell>CPF</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Data de Nascimento</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {listClients?.map((client) => (
              client?.name &&
              <TableRow key={client.cpf}>
                <TableCell>{client.cpf}</TableCell>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.birthday.toLocaleString('pt-BR', { year: 'numeric', month: 'numeric', day: 'numeric' })}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClient(client.cpf)}>
                    <EditOutlinedIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClient(client.cpf)}>
                    <ClearOutlinedIcon color='error' />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </Box>

    </Container >
  );
}

export default Clients;