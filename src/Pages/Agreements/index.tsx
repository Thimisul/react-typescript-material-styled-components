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
//Importar json Fake para testes
//Controlar o Form
import { Chip, Dialog, Divider, IconButton } from '@mui/material';

import { getAgreements } from '../../services/agreements';
import { AgreementsType } from '../../models';
import AgreementForm, { AgreementFormType } from './agreementsForm';


const Agreement = () => {
   //Mostrar Formulário
   const [formType, setTFormType] = useState<AgreementFormType>()
   //State da Lista de Usuários Cadastrados
   const [ agreementEdited, setAgreementEdited] = useState<AgreementsType>()
  //State da Lista de Usuários Cadastrados
  const [listAgreements, setAgreements] = useState<AgreementsType[]>([])
  //Recebe json para carregamento da lista na página
  useEffect(() => {
   getAgreements().then(agreements =>setAgreements(agreements.reverse()))
 }, [])

 const handleOpenForm = (agreement?: AgreementsType, formType?: AgreementFormType) => {
   setAgreementEdited(agreement)
   setTFormType(formType)
};

const onCloseForm = () => {
   setAgreementEdited(undefined)
   getAgreements().then(agreements =>setAgreements(agreements.reverse()))
   setTFormType(undefined)
}


  //const listUF = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ",
  //  "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]


  return (
    <Container>

      <Button sx={{ mt: 2 }} variant='contained' onClick={() => setTFormType({type: "show"})}>Adicionar um Novo Convênio</Button>

      <Box>
        <Divider />
        <Typography mt={3} variant={'h4'}>Lista de Convênios</Typography>
        <Table size="small">

          <TableHead>
            <TableRow>
              <TableCell>CNPJ</TableCell>
              <TableCell>Nome Fantasia</TableCell>
              <TableCell>Desconto</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {listAgreements?.map((agreement) => (
              agreement?.cnpj &&
              <TableRow key={agreement.cnpj} hover selected={agreement.id === agreementEdited?.id}>
                <TableCell>{agreement.cnpj}</TableCell>
                <TableCell>{agreement.fantasyName}</TableCell>
                <TableCell>{agreement.discount}%</TableCell>
                <TableCell>
                    {agreement.services?.map(service =>
                    (
                      <Chip
                        sx={{ m: 1 }}
                        key={service.id!}
                        label={service.name} />
                     
                    ))}
                  </TableCell>
                <TableCell>
                           <IconButton
                           onClick={() => handleOpenForm(agreement, {type: "show"})}
                           >
                              <EditOutlinedIcon />
                           </IconButton>
                           <IconButton
                              onClick={() => handleOpenForm(agreement, { type: "delete"})}
                           >
                              <DeleteOutlinedIcon color="error" />
                           </IconButton>
                        </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </Box>

      <Dialog maxWidth='md' open={formType? true : false} onClose={onCloseForm}>
            {formType && <AgreementForm agreement={agreementEdited} onCloseForm={onCloseForm} type={formType.type}></AgreementForm>}
         </Dialog>
         
    </Container >
  );
}

export default Agreement;