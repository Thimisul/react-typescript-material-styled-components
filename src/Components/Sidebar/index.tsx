import React from 'react';
//Imports Material-UI
import { Box, Divider, List, ListItem, ListItemIcon, ListItemText, Container, Hidden } from '@mui/material';
import { CalendarMonthOutlined, BadgeOutlined, GroupOutlined, FactCheckOutlined, PointOfSaleOutlined, LoyaltyOutlined, EqualizerOutlined } from '@mui/icons-material'
//import images 
import logoImg from '../../assets/Logo-Beauty-Saloon.svg'
import { Link } from 'react-router-dom';
//import Styled-Components


const Sidebar = () => {

  //Lista do Menu sidebar
  const listMenu = [
    {
      'text': 'Agenda',
      'icon': <CalendarMonthOutlined />
    },
    {
      'text': 'Clientes',
      'icon': <GroupOutlined />
    },
    {
      'text': 'Profissionais',
      'icon': <BadgeOutlined />
    },
    {
      'text': 'Serviços',
      'icon': <LoyaltyOutlined />
    },
    {
      'text': 'Convênios',
      'icon': <FactCheckOutlined />
    },
    {
      'text': 'Caixa',
      'icon': <PointOfSaleOutlined />
    },
    {
      'text': 'Relatórios',
      'icon': <EqualizerOutlined />,
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
            <ListItem key={item.text} button component={Link} to={item.text}>
              <ListItemIcon >
                {item.icon}
              </ListItemIcon>
              <ListItemText>{item.text}</ListItemText>
            </ListItem>
          ))}
        </List>

        <Divider />

      </Container>
    </Hidden >
  );
}

export default Sidebar;