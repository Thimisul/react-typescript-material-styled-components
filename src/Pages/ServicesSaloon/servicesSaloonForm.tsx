import { Paper, Typography, Box, Grid, TextField, Button, IconButton } from "@mui/material";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import  {ServicesSaloonType} from "../../models/";
import { createServicesSaloon, destroyServicesSaloon, editServicesSaloon } from "../../services/servicesSaloon";
import { useSnackbar } from 'notistack';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import InputAdornment from '@mui/material/InputAdornment';


import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

export type ServicesSaloonFormType = {
   type: 'show'| 'new' | 'delete' 
}

interface ServicesSaloonFormProps extends ServicesSaloonFormType {
   ServicesSaloon? : ServicesSaloonType
   onCloseForm: Function
   
}

export const ServicesSaloonForm = ({ServicesSaloon, onCloseForm, type}: ServicesSaloonFormProps) => {

   const { enqueueSnackbar } = useSnackbar();

   useEffect(() => {
      if(ServicesSaloon){
         setValue('id', ServicesSaloon.id)
         setValue('name', ServicesSaloon.name)
         setValue('duration', ServicesSaloon.duration)
         setValue('price', ServicesSaloon.price)
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
   } = useForm<ServicesSaloonType>();

   //Salva Usuário na Lista e da um reset no form
   const onSubmit: SubmitHandler<ServicesSaloonType> = (data: ServicesSaloonType) => {
      switch(type){

      case "show": editServicesSaloon(data).then(() => enqueueSnackbar(data.name + " Editado com Sucesso",{variant: 'success'}))
      break;
      case "new": createServicesSaloon(data).then(ServicesSaloon =>  enqueueSnackbar(ServicesSaloon.name + " Cadastrado com Sucesso", {variant: 'success'}))
      break;
      case "delete":  destroyServicesSaloon(data.id).then(() =>  enqueueSnackbar(data.name + " Deletado com Sucesso", {variant: 'info'}))
      }
      reset();
      onCloseForm()
   };

   return (
      <Paper sx={{ p: 2 }}>
         <Typography variant="h4" color="primary" gutterBottom sx={{ mb: 4, display: 'flex', justifyContent: 'space-between' }}>
         {ServicesSaloon? ServicesSaloon.name : "Cadastro de Serviços"} <IconButton onClick={() => onCloseForm()}><ClearOutlinedIcon></ClearOutlinedIcon></IconButton>
         </Typography>

         <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>

               <Controller
              name="name"
              defaultValue=''
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Grid item xs={12}> <TextField fullWidth {...field} label='Nome' /> </Grid>}
            />
            {errors.name?.type === 'required' &&
              <Typography variant='inherit' color={'tomato'} >* Nome deve ser preenchido</Typography>}

            <Controller
              name="duration"
              defaultValue={0}
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Grid item xs={3}> <TextField fullWidth {...field} label='Duração' 
              InputProps={{
               endAdornment: (
                 <InputAdornment position="end">
                   Min
                 </InputAdornment>
               ),
             }}
             variant="outlined"
             /> </Grid>}
            />
            {errors.name?.type === 'required' &&
              <Typography variant='inherit' color={'tomato'} >* Nome deve ser preenchido</Typography>}

            <Controller
              name="price"
              defaultValue={0}
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Grid item xs={3}>
                       <TextField {...field}
        id="input-with-icon-textfield"
        label="Valor"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PaidOutlinedIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      /> </Grid>}
            />
            {errors.name?.type === 'required' &&
              <Typography variant='inherit' color={'tomato'} >* Nome deve ser preenchido</Typography>}

                 
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
                     {ServicesSaloon ?  "Salvar" : "Cadastrar"}
                  </Button>}
           
         </Box>
      </Paper>
   );
};

export default ServicesSaloonForm;
