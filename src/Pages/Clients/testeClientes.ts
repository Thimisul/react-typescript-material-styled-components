import { faker } from '@faker-js/faker'

export const jsonClientsFaker = () => {

  var clients = [{
    cpf: '',
    name: '',
    birthday: new Date(Date.now())
  }];

  for (let index = 0; index < 10; index++) {
    clients.push({
      cpf: faker.phone.phoneNumber('###.###.###-##'),
      name: faker.name.findName(),
      birthday: new Date(faker.date.past())
    })
  }

  return JSON.stringify(clients)
}
