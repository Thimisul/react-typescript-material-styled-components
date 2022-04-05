import React from 'react';
//Imports Material-UI
import { Box, Divider, List, ListItem, ListItemIcon, ListItemText, Container, Hidden } from '@mui/material';
import { CalendarMonthOutlined, BadgeOutlined, GroupOutlined, FactCheckOutlined } from '@mui/icons-material'
//import images 
import logoImg from '../../assets/Logo-Beauty-Saloon.svg'
//import Styled-Components


const Sidebar = () => {

  const handleMenuSelect = (item: string) => {
    console.log(item)
  }

  const listMenu = [
    {
      'text': 'Agenda',
      'icon': <CalendarMonthOutlined />
    },
    {
      'text': 'Profissionais',
      'icon': <BadgeOutlined />
    },
    {
      'text': 'Clientes',
      'icon': <GroupOutlined />
    },
    {
      'text': 'Convenios',
      'icon': <FactCheckOutlined />
    }
  ]

  return (
    <Hidden smDown>
      <Container>

        <Box sx={{ pt: 1, pb: 1 }}>
          <img src={logoImg} alt="Beauty Saloon" />
        </Box>

        <Divider />

        <List>
          {listMenu.map((item) => (
            <ListItem button key={item.text} onClick={(e) => handleMenuSelect(item.text)}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>

        <Divider />

      </Container>
    </Hidden>
  );
}

export default Sidebar;