//React 
import React, { useState, useEffect } from 'react';
//Imports Material-UI
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Container from '@mui/material/Container';
//Material Icons
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
//Controlar o Form
import { Dialog, Divider, IconButton } from '@mui/material';
import ServicesSaloonForm, { ServicesSaloonFormType } from './servicesSaloonForm';
import { ServicesSaloonType } from '../../models';
import { getServicesSaloons } from '../../services/servicesSaloon';


const ServicesSaloon = () => {
       //Mostrar Formulário
       const [formType, setTFormType] = useState<ServicesSaloonFormType>()
       //State da Lista de Usuários Cadastrados
       const [ serviceEdited, setSErviceEdited] = useState<ServicesSaloonType>()
  //State da Lista de Usuários Cadastrados
  const [listServices, setServices] = useState<ServicesSaloonType[]>([])
  //Recebe json para carregamento da lista na página
  useEffect(() => {
    getServicesSaloons().then(services =>setServices(services.reverse()))
  }, [])


  const handleOpenForm = (service?: ServicesSaloonType, formType?: ServicesSaloonFormType) => {
   setSErviceEdited(service)
   setTFormType(formType)
};

const onCloseForm = () => {
   setSErviceEdited(undefined)
   getServicesSaloons().then(services =>setServices(services.reverse()))
   setTFormType(undefined)
}


  return (
    <Container>

      <Button sx={{ mt: 2 }} variant='contained' onClick={() => setTFormType({type: "new"})}>Adicionar um Novo Serviço</Button>

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
              <TableRow key={service.name} hover selected={service.id === serviceEdited?.id}>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.duration} Minutos</TableCell>
                <TableCell>{service.price}</TableCell>
                <TableCell>
                           <IconButton
                           onClick={() => handleOpenForm(service, {type: "show"})}
                           >
                              <EditOutlinedIcon />
                           </IconButton>
                           <IconButton
                              onClick={() => handleOpenForm(service, { type: "delete"})}
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
            {formType && <ServicesSaloonForm ServicesSaloon={serviceEdited} onCloseForm={onCloseForm} type={formType.type}></ServicesSaloonForm>}
         </Dialog>

    </Container >
  );
}

export default ServicesSaloon;