//React
import React, { useState, useEffect } from "react";
//Imports Material-UI
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Container from "@mui/material/Container";
import { Dialog, Divider, IconButton } from "@mui/material";
//Material Icons
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
//Models & Types
import { ClientType } from "../../models/clients";
//Services
import { getClients } from "../../services/clients";
//Component
import ClientForm, { ClientFormType } from "./clientForm";

const Clients = () => {

   //Mostrar Formulário
   const [formType, setTFormType] = useState<ClientFormType>()
   //State da Lista de Usuários Cadastrados
   const [listClients, setListClients] = useState<ClientType[]>([]);
   const [clientEdit, setClientEdit] = useState<ClientType>()

   //Recebe json para carregamento da lista na página
   useEffect(() => {
      getClients().then((clients) => setListClients(clients.reverse()));
   }, []);


   const handleOpenForm = (client?: ClientType, formType?: ClientFormType) => {
      setClientEdit(client)
      setTFormType(formType)
   };

   const onCloseForm = () => {
      setClientEdit(undefined)
      getClients().then((clients) => setListClients(clients.reverse()));
      setTFormType(undefined)
   }

   return (
      <Container>
         <Button
            sx={{ mt: 2 }}
            variant="contained"
            onClick={() => handleOpenForm(clientEdit, {type: 'new'})}
         >
            Adicionar um Novo Cliente
         </Button>

         <Box>
            <Divider />
            <Typography mt={3} variant={"h4"}>
               Lista de Clientes
            </Typography>
            <Table size="small">
               <TableHead>
                  <TableRow>
                     <TableCell>CPF</TableCell>
                     <TableCell>Name</TableCell>
                     <TableCell>Data de Nascimento</TableCell>
                     <TableCell>Convênio</TableCell>
                     <TableCell>Ações</TableCell>
                  </TableRow>
               </TableHead>

               <TableBody>
                  {listClients?.map((client: ClientType) => (
                     <TableRow key={client.id} hover selected={client.id === clientEdit?.id}>
                        <TableCell>{client.cpf} </TableCell>
                        <TableCell>{client.name}</TableCell>
                        <TableCell>{new Date(client.birthday).toLocaleDateString()}</TableCell>
                        <TableCell>{client.agreement?.fantasyName ?? ''}</TableCell>
                        <TableCell>
                           <IconButton
                           onClick={() => handleOpenForm(client, {type: "show"})}
                           >
                              <EditOutlinedIcon />
                           </IconButton>
                           <IconButton
                              onClick={() => handleOpenForm(client, { type: "delete"})}
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
            {formType && <ClientForm client={clientEdit} onCloseForm={onCloseForm} type={formType.type}></ClientForm>}
         </Dialog>

      </Container>
   );
};

export default Clients;
