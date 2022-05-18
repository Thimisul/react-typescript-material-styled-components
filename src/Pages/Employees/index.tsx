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
import OutlinedInput from '@mui/material/OutlinedInput';
//Importar json Fake para testes
//Controlar o Form
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Chip, Divider, IconButton, InputLabel, MenuItem, Theme, useTheme } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ServicesSaloonInterface, } from '../ServicesSaloon';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { EmployeesType } from '../../models';
import { getEmployees } from '../../services/employees';

const Employees = () => {
  const theme = useTheme();
  //react-hook-form
  const { handleSubmit, formState: { errors }, control, reset } = useForm<EmployeesType>();
  //Mostrar Formulário
  const [showForm, setShowForm] = useState<Boolean>(false);
  //State da Lista de Usuários Cadastrados
  const [listEmployees, setListEmployees] = useState<EmployeesType[]>([])
  const [listServices, setListServices] = useState<ServicesSaloonInterface[]>([])
  const [servicesSelected, setServicesSelected] = useState<string[]>([])
  //Recebe json para carregamento da lista na página


  useEffect(() => {
    getEmployees().then(employees =>setListEmployees(employees.reverse()))
  }, [])
  //Salva Usuário na Lista e da um reset no form
  const onSubmit: SubmitHandler<EmployeesType> = data => {
    console.log(data)
    setShowForm(false);
    setServicesSelected([])
    setListEmployees(state => [data, ...state])
    reset();
  };

  const handleChange = (event: SelectChangeEvent<typeof servicesSelected>) => {
    console.log(event)
    const { target: { value }, } = event;
    setServicesSelected(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


  function getStyles(name: string, servicesSelected: readonly string[], theme: Theme) {
    return {
      fontWeight:
        servicesSelected.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  return (

    <Container>

      <Button sx={{ mt: 2 }} variant='contained' onClick={() => setShowForm(true)}>Adicionar um Novo Funcionário</Button>

      {showForm && <Paper sx={{ p: 2 }}>

        <Grid container>
          <Grid item xs={11}> <Typography variant='h4' color='primary' gutterBottom>Cadastro de Funcionário</Typography></Grid>
          <Grid item xs={1}> <IconButton color='error'><ClearOutlinedIcon></ClearOutlinedIcon></IconButton></Grid>
        </Grid>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>

          <Grid container spacing={2}>

            <Controller
              name="cpf"
              defaultValue=''
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
                <Grid item xs={2}>
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
                <Grid item xs={8}>
                  <TextField fullWidth {...field} label='Nome' />
                </Grid>}
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
                      <Grid item xs={2} >
                        <TextField {...props} label='Data de Nascimento'></TextField>
                      </Grid>}
                  />
                }
              />
            </LocalizationProvider>

            <Grid item xs={12} >
              <Controller
                name="services"
                defaultValue={[]}
                control={control}
                render={({ field }) =>
                  <>
                    <InputLabel id="demo-multiple-chip-label">Serviços</InputLabel>
                    <Select {...field}
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={servicesSelected}
                      onChange={handleChange}
                      onBlur={field.onChange}
                      input={<OutlinedInput fullWidth id="select-multiple-chip" label="Serviços" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {listServices.map(service => (
                        <MenuItem
                          key={service.id}
                          value={service.name}
                          style={getStyles(service.name, servicesSelected, theme)} >
                          {service.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                }
              />
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
        <Divider />
        <Typography mt={3} variant={'h4'}>Lista de Funcionários</Typography>
        <Table size="small">

          <TableHead>
            <TableRow>
              <TableCell>CPF</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Data de Nascimento</TableCell>
              <TableCell>Serviços</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {listEmployees?.map((Employee: EmployeesType) => (
              <TableRow key={Employee.id}>
                <TableCell>{Employee.cpf}</TableCell>
                <TableCell>{Employee.name}</TableCell>
                <TableCell>{Employee.birthday.toLocaleString('pt-BR', { year: 'numeric', month: 'numeric', day: 'numeric' })}</TableCell>
                {listServices &&
                  <TableCell>
                    {Employee.services.map(service =>
                    (parseInt(service) % 2 === 0 ?
                      <Chip
                        sx={{ m: 1 }}
                        key={service}
                        label={listServices[parseInt(service)].name} />
                      : <></>
                    ))}
                  </TableCell>}
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