import { Paper, Typography, Box, Grid, TextField, Button, IconButton, Avatar, InputLabel, Chip, MenuItem, OutlinedInput, Select, SelectChangeEvent, Theme } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import EmployeeType from "../../models/employees";
import { createEmployee, destroyEmployee, editEmployee } from "../../services/employees";
import { useSnackbar } from 'notistack';


import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import theme from "../../assets/themeGlobal";
import { getServiceSaloons } from "../../services/servicesSaloon";
import { SchedulesType, ServicesSaloonType } from "../../models";

export type EmployeeFormType = {
   type: 'show'| 'new' | 'delete' 
}

interface EmployeeFormProps extends EmployeeFormType {
   employee? : EmployeeType
   onCloseForm: Function
   
}

export const EmployeeForm = ({employee, onCloseForm, type}: EmployeeFormProps) => {

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
      getServiceSaloons().then(services => setListServices(services))

      if(employee){
         setValue('id', employee.id)
         setValue('cpf', employee.cpf)
         setValue('name', employee.name)
         setValue('birthday', employee.birthday)
         employee.services.map(service => setServicesSelected(state =>[service.id!, ...state] ))
         setValue('services', employee.services)
      }
   },[])

   //react-hook-form
   const {
      handleSubmit,
      formState: { errors },
      control,
      reset,
      setValue
   } = useForm<EmployeeType>();

   //Salva Usuário na Lista e da um reset no form
   const onSubmit: SubmitHandler<EmployeeType> = (data: EmployeeType) => {
      switch(type){

      case "show": editEmployee(data).then(() => enqueueSnackbar(data.name + " Editado com Sucesso",{variant: 'success'}))
      break;
      case "new": createEmployee(data).then(employee =>  enqueueSnackbar(employee.name + " Cadastrado com Sucesso", {variant: 'success'}))
      break;
      case "delete":  destroyEmployee(data.id).then(() =>  enqueueSnackbar(data.name + " Deletado com Sucesso", {variant: 'info'}))
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
          return service.name
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
      <Paper sx={{ p: 2 }}>
         <Typography variant="h4" color="primary" gutterBottom sx={{ mb: 4, display: 'flex', justifyContent: 'space-between' }}>
         {employee? employee.name : "Cadastro de Funcionário"} <IconButton onClick={() => onCloseForm()}><ClearOutlinedIcon></ClearOutlinedIcon></IconButton>
         </Typography>

         <Box component="form" onSubmit={handleSubmit(onSubmit)}>

          <Grid container spacing={2}>

          <Grid item xs={2}>
               <Avatar alt="Remy Sharp" sx={{ml: 2, width: 56, height: 56 }} src="https://source.unsplash.com/800x600/?avatar" />
               </Grid>

            <Controller
              name="cpf"
              defaultValue=''
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
                <Grid item xs={5}>
                  <TextField fullWidth {...field} label='CPF' />
                </Grid>
              }
            />
            {errors.name?.type === 'required' &&
              <Typography variant='inherit' color={'tomato'} >* Nome deve ser preenchido</Typography>}
            

              <Controller
                control={control}
                name="birthday"
                defaultValue={new Date(Date.now())}
                rules={{ required: true }} //optional
                render={({ field }) =>
                  <DatePicker {...field}
                    value={field.value}
                    renderInput={props =>
                      <Grid item xs={5} >
                        <TextField {...props} label='Data de Nascimento'></TextField>
                      </Grid>}
                  />
                }
              />

<Controller
              name="name"
              defaultValue=''
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
                <Grid item xs={12}>
                  <TextField fullWidth {...field} label='Nome' />
                </Grid>}
            />
            {errors.name?.type === 'required' &&
              <Typography variant='inherit' color={'tomato'} >* Nome deve ser preenchido</Typography>}

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
                     {employee ?  "Salvar" : "Cadastrar"}
                  </Button>}
           
         </Box>
      </Paper>
   );
};

export default EmployeeForm;
