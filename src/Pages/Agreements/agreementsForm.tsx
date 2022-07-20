import { Paper, Typography, Box, Grid, TextField, Button, IconButton, Chip, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Theme } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {AgreementsType, ServicesSaloonType} from "../../models";
import { createAgreement, destroyAgreement, editAgreement } from "../../services/agreements";
import { useSnackbar } from 'notistack';


import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import theme from "../../assets/themeGlobal";
import { getServicesSaloons } from "../../services/servicesSaloon";

export type AgreementFormType = {
   type: 'show'| 'new' | 'delete' 
}

interface AgreementFormProps extends AgreementFormType {
   agreement? : AgreementsType
   onCloseForm: Function
   
}

export const AgreementForm = ({agreement, onCloseForm, type}: AgreementFormProps) => {

   const [listServices, setListServices] = useState<ServicesSaloonType[]>([])
   const [servicesSelected, setServicesSelected] = useState<string[]>([])

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

   const { enqueueSnackbar } = useSnackbar();

   useEffect(() => {
      getServicesSaloons().then(services => setListServices(services))
      
      if(agreement){
         setValue('id', agreement.id)
         setValue('fantasyName', agreement.fantasyName)
         setValue('corporateName', agreement.corporateName)
         setValue('cnpj', agreement.cnpj)
         setValue('cep',agreement.cep)
         setValue('state', agreement.state)
         setValue('street', agreement.street)
         setValue('number', agreement.number)
         setValue('city', agreement.city)
         setValue('complement', agreement.complement)
         agreement.services?
         agreement.services.map(service => setServicesSelected(state =>[service.id!, ...state] )) : console.log()
         setValue('services', agreement.services!)
         setValue('discount', agreement.discount)
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
   } = useForm<AgreementsType>();

   //Salva Usuário na Lista e da um reset no form
   const onSubmit: SubmitHandler<AgreementsType> = (data: AgreementsType) => {
      switch(type){

      case "show": editAgreement(data).then(() => enqueueSnackbar(data.fantasyName + " Editado com Sucesso",{variant: 'success'}))
      break;
      case "new": createAgreement(data).then(agreement =>  enqueueSnackbar(agreement.fantasyName + " Cadastrado com Sucesso", {variant: 'success'}))
      break;
      case "delete":  destroyAgreement(data.id).then(() =>  enqueueSnackbar(data.fantasyName + " Deletado com Sucesso", {variant: 'info'}))
      }
      reset();
      onCloseForm()
   };

   function getStyles(name: string, servicesSelected: readonly string[], theme: Theme) {
      return {
        fontWeight:
          servicesSelected.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
      };
    }

   const handleGetLabel = (value: string): string => {
      const response = listServices.map(service => {
       if(service.id === value){
          return  service.name
       }
    })
    return response.toString()
   }
   
   const handleChange = (event: SelectChangeEvent<typeof servicesSelected>) => {
      console.log(event)
      const { target: { value }, } = event;
      setServicesSelected(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };


   return (
      <Paper sx={{ p: 1 }}>
         <Typography variant="h4" color="primary" gutterBottom sx={{ mb: 4, display: 'flex', justifyContent: 'space-between' }}>
         {agreement? agreement.fantasyName : "Cadastro de Convênio"} <IconButton onClick={() => onCloseForm()}><ClearOutlinedIcon></ClearOutlinedIcon></IconButton>
         </Typography>

         <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>

               <Controller
              name="cnpj"
              defaultValue=''
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
                <Grid item xs={3}>
                  <TextField fullWidth {...field} label='CNPJ' />
                </Grid>
              }
            />
            {errors.cnpj?.type === 'required' &&
              <Typography variant='inherit' color={'tomato'} >* Nome deve ser preenchido</Typography>}

            <Controller
              name="corporateName"
              defaultValue=''
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
                <Grid item xs={5}>
                  <TextField fullWidth {...field} label='Razão Social' />
                </Grid>
              }
            />
            {errors.corporateName?.type === 'required' &&
              <Typography variant='inherit' color={'tomato'} >* Nome deve ser preenchido</Typography>}

<Grid item xs={2}></Grid>

<Controller
              name="discount"
              defaultValue={0}
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
                <Grid item xs={2}>
                  <TextField fullWidth {...field} label='Desconto' />
                </Grid>
              }
            />
            {errors.discount?.type === 'required' &&
              <Typography variant='inherit' color={'tomato'} >* Nome deve ser preenchido</Typography>}


            <Controller
              name="fantasyName"
              defaultValue=''
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
                <Grid item xs={8}>
                  <TextField fullWidth {...field} label='Nome Fantasia' />
                </Grid>
              }
            />
            {errors.fantasyName?.type === 'required' &&
              <Typography variant='inherit' color={'tomato'} >* Nome deve ser preenchido</Typography>}

<Grid item xs={4}></Grid>

            <Controller
              name="cep"
              defaultValue=''
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
                <Grid item xs={2}>
                  <TextField fullWidth {...field} label='CEP' />
                </Grid>
              }
            />
            {errors.cep?.type === 'required' &&
              <Typography variant='inherit' color={'tomato'} >* Nome deve ser preenchido</Typography>}

            <Controller
              name="street"
              defaultValue=''
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
                <Grid item xs={8}>
                  <TextField fullWidth {...field} label='Rua' />
                </Grid>
              }
            />
            {errors.street?.type === 'required' &&
              <Typography variant='inherit' color={'tomato'} >* Nome deve ser preenchido</Typography>}

            <Controller
              name="number"
              defaultValue=''
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
                <Grid item xs={2}>
                  <TextField fullWidth {...field} label='N' />
                </Grid>
              }
            />
            {errors.number?.type === 'required' &&
              <Typography variant='inherit' color={'tomato'} >* Nome deve ser preenchido</Typography>}

            <Controller
              name="state"
              defaultValue=''
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
                <Grid item xs={2}>
                  <TextField fullWidth {...field} label='UF' />
                </Grid>
              }
            />
            {errors.state?.type === 'required' &&
              <Typography variant='inherit' color={'tomato'} >* Nome deve ser preenchido</Typography>}

            <Controller
              name="city"
              defaultValue=''
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
                <Grid item xs={4}>
                  <TextField fullWidth {...field} label='Cidade' />
                </Grid>
              }
            />
            {errors.city?.type === 'required' &&
              <Typography variant='inherit' color={'tomato'} >* Nome deve ser preenchido</Typography>}

            <Controller
              name="complement"
              defaultValue=''
              control={control}
              render={({ field }) =>
                <Grid item xs={6}>
                  <TextField fullWidth {...field} label='Complemento' />
                </Grid>
              }
            />

<Grid item xs={12} >
   
              <Controller
                name="services"
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
                            <Chip key={value} label={handleGetLabel(value)} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {listServices.map(service => (
                        <MenuItem
                          key={service.id}
                          value={service.id}
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
                     {agreement ?  "Salvar" : "Cadastrar"}
                  </Button>}
           
         </Box>
      </Paper>
   );
};

export default AgreementForm;
