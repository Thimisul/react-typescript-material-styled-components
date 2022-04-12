import { faker } from '@faker-js/faker'

export const jsonEmployeesFaker = () => {

  var employees = [{
    name: '',
    birthday: new Date(Date.now())
  }];

  for (let index = 0; index < 10; index++) {
    employees.push({
      name: faker.name.findName(),
      birthday: new Date(faker.date.past())
    })
  }

  return JSON.stringify(employees)
}