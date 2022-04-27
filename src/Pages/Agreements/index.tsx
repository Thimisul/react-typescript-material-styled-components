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
//Importar json Fake para testes
import { jsonAgreementsFaker } from './testeAgreements'
//Controlar o Form
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Divider, IconButton } from '@mui/material';
import { ServicesSaloonInterface } from '../ServicesSaloon';

//Interfaces
// Cadastro de Convênios
// Nome Fantasia, Razão Social, CNPJ, Valor de Desconto, Cidade, Estado, Rua, Cep, Número e Complemento 

// Tabela Servicos
// Serviço


export interface AgreementInterface {
  id: string;
  fantasyName: string,
  corporateName: string
  cnpj: string
  discount: string,
  city: string,
  state: string,
  street: string,
  cep: string,
  number: string,
  complement: string,
  Service: ServicesSaloonInterface
}


const Agreement = () => {
  //react-hook-form
  const { handleSubmit, formState: { errors }, control, reset } = useForm<AgreementInterface>();
  //Mostrar Formulário
  const [showForm, setShowForm] = useState<Boolean>(false);
  //State da Lista de Usuários Cadastrados
  const [listAgreements, setAgreements] = useState<AgreementInterface[]>([])
  //Recebe json para carregamento da lista na página
  useEffect(() => {
    setAgreements(JSON.parse(jsonAgreementsFaker()));
  }, [])
  //Salva Usuário na Lista e da um reset no form
  const onSubmit: SubmitHandler<AgreementInterface> = data => {
    setShowForm(false);
    setAgreements(state => [data, ...state])
    reset();
  };

  //const listUF = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ",
  //  "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]


  return (
    <Container>

      <Button sx={{ mt: 2 }} variant='contained' onClick={() => setShowForm(true)}>Adicionar um Novo Convênio</Button>

      {showForm && <Paper sx={{ p: 2 }}>

        <Typography variant='h4' color='primary' gutterBottom>Cadastro de Convênios</Typography>

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

            <Controller
              name="fantasyName"
              defaultValue=''
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
                <Grid item xs={4}>
                  <TextField fullWidth {...field} label='Nome Fantasia' />
                </Grid>
              }
            />
            {errors.fantasyName?.type === 'required' &&
              <Typography variant='inherit' color={'tomato'} >* Nome deve ser preenchido</Typography>}

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
                <Grid item xs={9}>
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
                <Grid item xs={1}>
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
                <Grid item xs={1}>
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
              rules={{ required: true }}
              render={({ field }) =>
                <Grid item xs={5}>
                  <TextField fullWidth {...field} label='Complemento' />
                </Grid>
              }
            />
            {errors.complement?.type === 'required' &&
              <Typography variant='inherit' color={'tomato'} >* Nome deve ser preenchido</Typography>}

            <Controller
              name="discount"
              defaultValue=''
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


          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cadastrar
          </Button>

        </Box>

      </Paper>
      }

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
              <TableRow key={agreement.cnpj}>
                <TableCell>{agreement.cnpj}</TableCell>
                <TableCell>{agreement.fantasyName}</TableCell>
                <TableCell>{agreement.discount}%</TableCell>
                <TableCell><IconButton><EditOutlinedIcon /></IconButton><IconButton><ClearOutlinedIcon /></IconButton></TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </Box>

    </Container >
  );
}

export default Agreement;