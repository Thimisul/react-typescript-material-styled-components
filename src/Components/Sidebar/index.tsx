import React from 'react';
//Imports Material-UI
import { Box, Divider, List, ListItem, ListItemIcon, ListItemText, Container, Hidden } from '@mui/material';
import { CalendarMonthOutlined, BadgeOutlined, GroupOutlined, FactCheckOutlined, PointOfSaleOutlined, LoyaltyOutlined, EqualizerOutlined } from '@mui/icons-material'
//import images 
import logoImg from '../../assets/Logo-Beauty-Saloon.svg'
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
//import Styled-Components


const Sidebar = () => {

  const handleMenuSelect = (item: string) => {
    console.log(item)

  }

  const listMenu = [
    {
      'text': 'Agenda',
      'icon': <CalendarMonthOutlined />,
      'divider': true
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
      'icon': <FactCheckOutlined />,
      'divider': true
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
            <ListItem button component={RouterLink} key={item.text} to={item.text} >
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