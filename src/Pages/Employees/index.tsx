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
import { jsonEmployeesFaker } from './testeEmployees'
//Controlar o Form
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Divider, IconButton } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

//Interfaces

interface IFormInputs {
  name: string
  birthday: Date
}


const Employees = () => {
  //react-hook-form
  const { handleSubmit, formState: { errors }, control, reset } = useForm<IFormInputs>();
  //Mostrar Formulário
  const [showForm, setShowForm] = useState<Boolean>(false);
  //State da Lista de Usuários Cadastrados
  const [listEmployees, setListEmployees] = useState<IFormInputs[]>([])
  //Recebe json para carregamento da lista na página
  useEffect(() => {
    setListEmployees(JSON.parse(jsonEmployeesFaker()));
  }, [])
  //Salva Usuário na Lista e da um reset no form
  const onSubmit: SubmitHandler<IFormInputs> = data => {
    setShowForm(false);
    setListEmployees(state => [data, ...state])
    reset();
  };


  return (
    <Container>

      <Button sx={{ mt: 2 }} variant='contained' onClick={() => setShowForm(true)}>Adicionar um Novo Employee</Button>

      {showForm && <Paper sx={{ p: 2 }}>

        <Typography variant='h4' color='primary' gutterBottom>Cadastro de Employee</Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>

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

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid item xs={6} >
                <Controller
                  control={control}
                  name="birthday"
                  defaultValue={new Date(Date.now())}
                  rules={{ required: true }} //optional
                  render={({ field }) =>
                    <DatePicker {...field}
                      value={field.value}
                      renderInput={props => <TextField {...props} label='Data de Nascimento'></TextField>}
                    />


                  }
                />
              </Grid>
            </LocalizationProvider>
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
        <Typography mt={3} variant={'h4'}>Lista de Employees</Typography>
        <Table size="small">

          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Data de Nascimento</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {listEmployees?.map((Employee) => (
              Employee?.name &&
              <TableRow key={Employee.name}>
                <TableCell>{Employee.name}</TableCell>
                <TableCell>{Employee.birthday.toLocaleString('pt-BR', { year: 'numeric', month: 'numeric', day: 'numeric' })}</TableCell>
                <TableCell><IconButton><EditOutlinedIcon /></IconButton><IconButton><ClearOutlinedIcon /></IconButton></TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </Box>

    </Container >
  );
}

export default Employees;