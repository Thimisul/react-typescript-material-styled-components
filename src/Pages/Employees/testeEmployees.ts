import { faker } from '@faker-js/faker'

export const jsonEmployeesFaker = () => {

  var Employees = [{
    name: '',
    gender: '',
  }];

  for (let index = 0; index < 10; index++) {
    Employees.push({
      name: faker.name.findName(),
      gender: faker.name.gender()
    })
  }

  return JSON.stringify(Employees)
}