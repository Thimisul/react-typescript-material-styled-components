import React, { useState } from 'react';
//Imports Material-UI
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';



const Clients = () => {

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const handleSubmit = () => console.log(firstName + " " + lastName);

  return (
    <>

      <Button sx={{ mt: 2 }} variant='contained' onClick={handleSubmit}>Adicionar um Novo Cliente</Button>

      <Paper sx={{ p: 2 }}>

        <Typography variant='h4' color='primary' gutterBottom>Form Demo</Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              fullWidth
              autoComplete="given-name"
              variant="outlined"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              label={"Primeiro Nome"} //optional
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              fullWidth
              autoComplete="given-lastName"
              variant="outlined"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              label={"Sobrenome"} //optional
            />
          </Grid>
        </Grid>
        <Button fullWidth sx={{ mt: 2 }} variant='outlined' onClick={handleSubmit}>Submit</Button>
      </Paper>

    </>
  );
}

export default Clients;