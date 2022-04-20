import { faker } from '@faker-js/faker'
//Cadastro de Serviços Nome, Duração, Valor

const ArrayN = [30, 60, 90, 120];

export const jsonServicesFaker = () => {

  var employees: {
    id: number,
    name: string,
    duration: number,
    price: string
  }[];

  employees = []

  for (let index = 1; index < 10; index++) {
    employees.push({
      id: index,
      name: faker.commerce.productName(),
      duration: ArrayN[Math.floor(Math.random() * ArrayN.length)],
      price: faker.commerce.price(10, 300, 2, 'R$')
    })
  }

  return JSON.stringify(employees)
}

