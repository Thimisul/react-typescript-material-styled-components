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
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import OutlinedInput from '@mui/material/OutlinedInput';
//Importar json Fake para testes
//Controlar o Form
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Chip, Dialog, Divider, IconButton, InputLabel, MenuItem, Theme, useTheme } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { EmployeesType, ServicesSaloonType } from '../../models';
import { createEmployee, getEmployees } from '../../services/employees';
import { getServiceSaloons } from '../../services/servicesSaloon';
import ClientForm from '../Clients/clientForm';
import EmployeeForm, { EmployeeFormType } from './employeeForm';

const Employees = () => {
  const theme = useTheme();
  //react-hook-form
  const { handleSubmit, formState: { errors }, control, reset } = useForm<EmployeesType>();
     //Mostrar Formulário
     const [formType, setTFormType] = useState<EmployeeFormType>()
  //State da Lista de Usuários Cadastrados
  const [listEmployees, setListEmployees] = useState<EmployeesType[]>([])
  const [listServices, setListServices] = useState<ServicesSaloonType[]>([])
  const [ employeeEdit, setEmployeeEdit] = useState<EmployeesType>()
  //Recebe json para carregamento da lista na página


  useEffect(() => {
      getEmployees().then(employees =>setListEmployees(employees.reverse()))
  }, [])

  const handleOpenForm = (employee?: EmployeesType, formType?: EmployeeFormType) => {
   setEmployeeEdit(employee)
   setTFormType(formType)
};

const onCloseForm = () => {
   setEmployeeEdit(undefined)
   getEmployees().then((employees) => setListEmployees(employees.reverse()));
   setTFormType(undefined)
}

  return (

    <Container>

      <Button sx={{ mt: 2 }} variant='contained' onClick={() => handleOpenForm(employeeEdit, {type: 'new'})}>Adicionar um Novo Funcionário</Button>

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
            {listEmployees?.map((employee: EmployeesType) => (
              <TableRow key={employee.id} hover selected={employee.id === employeeEdit?.id}>
                <TableCell>{employee.cpf}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{new Date(employee.birthday).toLocaleDateString()}</TableCell>
                {listServices &&
                  <TableCell>
                    {employee.services.map(service =>
                    (
                      <Chip
                        sx={{ m: 1 }}
                        key={service.id!}
                        label={service.name} />
                     
                    ))}
                  </TableCell>}
                  <TableCell>
                           <IconButton
                           onClick={() => handleOpenForm(employee, {type: "show"})}
                           >
                              <EditOutlinedIcon />
                           </IconButton>
                           <IconButton
                              onClick={() => handleOpenForm(employee, { type: "delete"})}
                           >
                              <DeleteOutlinedIcon color="error" />
                           </IconButton>
                        </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </Box>

      <Dialog open={formType? true : false} onClose={onCloseForm}>
            {formType && <EmployeeForm employee={employeeEdit} onCloseForm={onCloseForm} type={formType.type}></EmployeeForm>}
         </Dialog>

    </Container >
  );
}

export default Employees;