import { Paper, Typography, Box, Grid, TextField, Button, IconButton } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ClientType from "../../models/clients";
import { createClient, editClient } from "../../services/clients";
import { useSnackbar } from 'notistack';


import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

type ClientFormType = {
   client? : ClientType
   setShowForm : React.Dispatch<React.SetStateAction<boolean>>
   onCloseForm: Function
}

export const ClientForm = ({client, setShowForm, onCloseForm}: ClientFormType) => {

   const { enqueueSnackbar } = useSnackbar();

   useEffect(() => {
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
      }
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
      client ? editClient(data).then(client => 
         enqueueSnackbar(data.name + " Editado com Sucesso",{variant: 'success'}))
      : createClient(data).then(client =>  enqueueSnackbar(client.name + " Cadastrado com Sucesso", {variant: 'success'}))
      reset();
      onCloseForm()
      
      // setShowForm(false);
   };

   return (
      <Paper sx={{ p: 2 }}>
         <Typography variant="h4" color="primary" gutterBottom sx={{ mb: 4, display: 'flex', justifyContent: 'space-between' }}>
            Cadastro de Cliente <IconButton onClick={() => onCloseForm()}><ClearOutlinedIcon></ClearOutlinedIcon></IconButton>
         </Typography>

         <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
               <Controller
                  name="cpf"
                  defaultValue=""
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <Grid item xs={3}>
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
                  name="name"
                  defaultValue=""
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <Grid item xs={6}>
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
                     control={control}
                     name="birthday"
                     defaultValue={new Date(Date.now()).toISOString()}
                     rules={{ required: true }} //optional
                     render={({ field }) => (
                        <DatePicker
                           {...field}
                           renderInput={(props) => (
                              <Grid item xs={3}>
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
                  name="cep"
                  defaultValue=""
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <Grid item xs={2}>
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
                     <Grid item xs={9}>
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
                     <Grid item xs={1}>
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
                     <Grid item xs={3}>
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
                     <Grid item xs={5}>
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
                  rules={{ required: false }}
                  render={({ field }) => (
                     <Grid item xs={4}>
                        <TextField fullWidth {...field} label="Complemento" />
                     </Grid>
                  )}
               />
               {errors.name?.type === "required" && (
                  <Typography variant="inherit" color={"tomato"}>
                     * Nome deve ser preenchido
                  </Typography>
               )}
                 
            </Grid>
            <Button
                     type="submit"
                     variant="outlined"
                     fullWidth
                     sx={{py:2, my: 2}}
                  >
                     {client ? "Salvar" : "Cadastrar"}
                  </Button>
         </Box>
      </Paper>
   );
};

export default ClientForm;
