import { Paper, Typography, Box, Grid, TextField, Button, IconButton, Avatar, MenuItem, Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ClientType from "../../models/clients";
import { createClient, destroyClient, editClient } from "../../services/clients";
import { useSnackbar } from 'notistack';


import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { ServicesSaloonType } from "../../models";
import agreements, { AgreementsType } from "../../models/agreements";
import { getAgreements } from "../../services/agreements";

export type ClientFormType = {
   type: 'show'| 'new' | 'delete' 
}

interface ClientFormProps extends ClientFormType {
   client? : ClientType
   onCloseForm: Function
   
}

export const ClientForm = ({client, onCloseForm, type}: ClientFormProps) => {

   const [agreements, setAgreements] = useState<AgreementsType[]>([])

   const { enqueueSnackbar } = useSnackbar();

   useEffect(() => {
      getAgreements().then(agreements =>setAgreements(agreements.reverse()))
      if(client){
         setValue('id', client.id)
         setValue('cpf', client.cpf)
         setValue('name', client.name)
         setValue('birthday', client.birthday)
         setValue('cep', client.cep)
         setValue('street', client.street)
         setValue('number', client.number)
         setValue('district', client.district)
         setValue('city', client.city)
         setValue('complement', client.complement)
         client.agreement ? setValue('agreement', client.agreement) : console.log()
      }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])

   //react-hook-form
   const {
      handleSubmit,
      formState: { errors },
      control,
      reset,
      setValue
   } = useForm<ClientType>();

   //Salva Usuário na Lista e da um reset no form
   const onSubmit: SubmitHandler<ClientType> = (data: ClientType) => {
      switch(type){

      case "show": editClient(data).then(() => enqueueSnackbar(data.name + " Editado com Sucesso",{variant: 'success'}))
      break;
      case "new": createClient(data).then(client =>  enqueueSnackbar(client.name + " Cadastrado com Sucesso", {variant: 'success'}))
      break;
      case "delete":  destroyClient(data.id).then(() =>  enqueueSnackbar(data.name + " Deletado com Sucesso", {variant: 'info'}))
      }
      reset();
      onCloseForm()
   };

   return (
      <Paper sx={{ p: 2 }}>
         <Typography variant="h4" color="primary" gutterBottom sx={{ mb: 4, display: 'flex', justifyContent: 'space-between' }}>
         {client? client.name : "Cadastro de Cliente"} <IconButton onClick={() => onCloseForm()}><ClearOutlinedIcon></ClearOutlinedIcon></IconButton>
         </Typography>

         <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>

               <Grid item xs={2}>
               <Avatar variant="rounded" alt="Remy Sharp" sx={{ml: 2, width: 56, height: 56 }} src="https://source.unsplash.com/800x600/?avatar" />
               </Grid>

               <Controller
                  name="cpf"
                  defaultValue=""
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <Grid item xs={5}>
                        <TextField fullWidth {...field} label="CPF" />
                     </Grid>
                  )}
               />
               {errors.name?.type === "required" && (
                  <Typography variant="inherit" color={"tomato"}>
                     * Nome deve ser preenchido
                  </Typography>
               )}

<Controller
                     control={control}
                     name="birthday"
                     defaultValue={new Date(Date.now()).toISOString()}
                     rules={{ required: true }} //optional
                     render={({ field }) => (
                        <DatePicker
                           {...field}
                           renderInput={(props) => (
                              <Grid item xs={5}>
                                 <TextField
                                    value={field.value}
                                    {...props}
                                    label="Data de Nascimento"
                                 ></TextField>
                              </Grid>
                           )}
                        />
                     )}
                  />


               <Controller
                  name="name"
                  defaultValue=""
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <Grid item xs={12}>
                        <TextField fullWidth {...field} label="Nome" />
                     </Grid>
                  )}
               />
               {errors.name?.type === "required" && (
                  <Typography variant="inherit" color={"tomato"}>
                     * Nome deve ser preenchido
                  </Typography>
               )}

               <Controller
                  name="cep"
                  defaultValue=""
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <Grid item xs={3}>
                        <TextField fullWidth {...field} label="CEP" />
                     </Grid>
                  )}
               />
               {errors.name?.type === "required" && (
                  <Typography variant="inherit" color={"tomato"}>
                     * Nome deve ser preenchido
                  </Typography>
               )}

               <Controller
                  name="street"
                  defaultValue=""
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <Grid item xs={7}>
                        <TextField fullWidth {...field} label="Logradouro" />
                     </Grid>
                  )}
               />
               {errors.name?.type === "required" && (
                  <Typography variant="inherit" color={"tomato"}>
                     * Nome deve ser preenchido
                  </Typography>
               )}

               <Controller
                  name="number"
                  defaultValue=""
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <Grid item xs={2}>
                        <TextField fullWidth {...field} label="N" />
                     </Grid>
                  )}
               />
               {errors.name?.type === "required" && (
                  <Typography variant="inherit" color={"tomato"}>
                     * Nome deve ser preenchido
                  </Typography>
               )}

               <Controller
                  name="district"
                  defaultValue=""
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <Grid item xs={5}>
                        <TextField fullWidth {...field} label="Bairro" />
                     </Grid>
                  )}
               />
               {errors.name?.type === "required" && (
                  <Typography variant="inherit" color={"tomato"}>
                     * Nome deve ser preenchido
                  </Typography>
               )}

               <Controller
                  name="city"
                  defaultValue=""
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <Grid item xs={7}>
                        <TextField fullWidth {...field} label="Cidade" />
                     </Grid>
                  )}
               />
               {errors.name?.type === "required" && (
                  <Typography variant="inherit" color={"tomato"}>
                     * Nome deve ser preenchido
                  </Typography>
               )}

               <Controller
                  name="complement"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                     <Grid item xs={6}>
                        <TextField fullWidth {...field} label="Complemento" />
                     </Grid>
                  )}
               />

<Controller
            name="agreement.id"
            control={control}
            render={
              ({ field }) =>
              <Grid item xs={6}>
                <Select
                  {...field}
                  margin="dense"
                  id="client"
                  label="Cliente"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={field.value ?? ''}
                >{
                    agreements?.map(agreement => (
                      <MenuItem key={agreement.id} value={agreement.id}>{agreement.fantasyName}</MenuItem>
                    ))}
                </Select>
                </Grid>
            }
          />
                 
            </Grid>
            {type === "delete"? 
             <Button
             type="submit"
             variant="outlined"
             fullWidth
             color="error"
             sx={{py:2, my: 2}}
          >
             Deletar
          </Button>
            :  <Button
                     type="submit"
                     variant="outlined"
                     fullWidth
                     sx={{py:2, my: 2}}
                  >
                     {client ?  "Salvar" : "Cadastrar"}
                  </Button>}
           
         </Box>
      </Paper>
   );
};

export default ClientForm;
