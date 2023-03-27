import { faker } from '@faker-js/faker';

const createRandomUser = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const name = `${firstName} ${lastName}`;
  const email = faker.internet.email(
    firstName.toLowerCase(),
    lastName.toLowerCase(),
    'gmail.com',
  );
  const password = 'cy-test-user123';

  return {
    name,
    email,
    password,
  };
};

export const user = createRandomUser();
export const defaultUser = {
  email: 'cypress-e2e-test@gmail.com',
  password: 'cy-e2e-test123',
};
