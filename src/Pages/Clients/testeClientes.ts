import { faker } from '@faker-js/faker'

export const jsonClientsFaker = () => {

  var clients = [{
    name: '',
    gender: '',
  }];

  for (let index = 0; index < 20; index++) {
    clients.push({
      name: faker.name.findName(),
      gender: faker.name.gender()
    })
  }

  return JSON.stringify(clients)
}