import { faker } from '@faker-js/faker'

// Cadastro de Convênios
// Nome Fantasia, Razão Social, CNPJ, Valor de Desconto, Cidade, Estado, Rua, Cep, Número e Complemento 

// Tabela Servicos
// Serviço


export const jsonCashiersFaker = () => {

  var clients = [{
    name: '',
    service: '',
    date: new Date(Date.now()),
    price: '',
    isPaidOut: true,


  }];

  for (let index = 0; index < 8; index++) {
    clients.push({
      name: faker.name.findName(),
      service: faker.commerce.productName(),
      date: faker.date.future(),
      price: faker.commerce.price(50, 300),
      isPaidOut: faker.datatype.boolean()
    })
  }

  return JSON.stringify(clients)
}
