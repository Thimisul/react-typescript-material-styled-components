import { faker } from '@faker-js/faker'

// Cadastro de Convênios
// Nome Fantasia, Razão Social, CNPJ, Valor de Desconto, Cidade, Estado, Rua, Cep, Número e Complemento 

// Tabela Servicos
// Serviço


export const jsonAgreementsFaker = () => {

  let clients: {
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
    service: string
  }[];

  clients = [];

  for (let index = 0; index < 10; index++) {
    clients.push({
      cnpj: faker.phone.phoneNumber('##.###.###/0001-##'),
      fantasyName: faker.name.findName(),
      corporateName: faker.name.findName(),
      discount: faker.commerce.price(0, 50, 0),
      city: faker.address.cityName(),
      state: faker.address.state(),
      street: faker.address.streetName(),
      cep: faker.phone.phoneNumber('#####-###'),
      number: faker.phone.phoneNumber('##'),
      complement: '',
      service: faker.commerce.productName()
    })
  }

  return JSON.stringify(clients)
}
