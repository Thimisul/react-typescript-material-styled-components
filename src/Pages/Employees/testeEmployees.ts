import { faker } from '@faker-js/faker'

export const jsonEmployeesFaker = () => {

  var employees: {
    id: number,
    cpf: string,
    name: string,
    birthday: Date,
    services: string[]
  }[];

  employees = []

  for (let index = 0; index < 10; index++) {
    employees.push({
      id: index,
      cpf: faker.phone.phoneNumber('###.###.###-##'),
      name: faker.name.findName(),
      birthday: new Date(faker.date.past()),
      services: [faker.phone.phoneNumber('#'), faker.phone.phoneNumber('#'), faker.phone.phoneNumber('#')]
    })
  }
  console.log(employees)
  return JSON.stringify(employees)
}

