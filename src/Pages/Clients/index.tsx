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
//Models
import { ClientType } from "../../models/clients";
import { destroyClient, getClients } from "../../services/clients";
import ClientForm from "./clientForm";

const Clients = () => {

   //Mostrar Formulário
   const [showForm, setShowForm] = useState<boolean>(false);
   //State da Lista de Usuários Cadastrados
   const [listClients, setListClients] = useState<ClientType[]>([]);
   const [clientEdit, setClientEdit] = useState<ClientType>()

   //Recebe json para carregamento da lista na página
   useEffect(() => {
      getClients().then((clients) => setListClients(clients.reverse()));
   }, []);

   const handleDeleteClient = (id: string | number) => {
      destroyClient(id).then(res => setListClients(listClients.filter((client) => client.id !== id)));
   }

   const handleEditClient = (client: ClientType) => {
      setClientEdit(client)
      setShowForm(true)
   };

   const onCloseForm = () => {
      setClientEdit(undefined)
      getClients().then((clients) => setListClients(clients.reverse()));
      setShowForm(false)
   }

   return (
      <Container>
         <Button
            sx={{ mt: 2 }}
            variant="contained"
            onClick={() => setShowForm(true)}
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
                     <TableCell>Ações</TableCell>
                  </TableRow>
               </TableHead>

               <TableBody>
                  {listClients?.map((client: ClientType) => (
                     <TableRow key={client.id}>
                        <TableCell>{client.cpf}</TableCell>
                        <TableCell>{client.name}</TableCell>
                        <TableCell>
                           {client.birthday}
                        </TableCell>
                        <TableCell>
                           <IconButton
                              onClick={() => handleEditClient(client)}
                           >
                              <EditOutlinedIcon />
                           </IconButton>
                           <IconButton
                              onClick={() => handleDeleteClient(client.id!)}
                           >
                              <DeleteOutlinedIcon color="error" />
                           </IconButton>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </Box>

         <Dialog maxWidth="lg" open={showForm} onClose={onCloseForm}>
            <ClientForm client={clientEdit} setShowForm={setShowForm} onCloseForm={onCloseForm}></ClientForm>
         </Dialog>

      </Container>
   );
};

export default Clients;
