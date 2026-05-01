import {faker} from "@faker-js/faker";


export const createFakeUser = () => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password({ length: 8}),
})

export const createInvalidUser = () => ({
  name: faker.person.fullName(),
  email: "notanemail",
  password: faker.internet.password({ length: 7}),
})