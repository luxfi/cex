export const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

export const testUser = {
  email: 'test@test.com',
  password: 'qqqqqqqq',
}

export const userProfile = {
  firstName: ['John', 'Jane', 'James', 'Sean', 'Martha'][getRandomInteger(0, 4)],
  lastName: ['Parker', 'Brown', 'Bond', 'Potter', 'McDonald'][getRandomInteger(0, 4)],
  gender: ['male', 'female', 'other', 'unspecified'][getRandomInteger(0, 3)],
  taxId: ['123-23-4678', '123-45-6789', '089-86-9033', '208-45-7294'][getRandomInteger(0, 3)],
  address1: ['1234 lane close', '789 street avenue', '76 park crescent'][getRandomInteger(0, 2)],
  address2: ['apt 49, building 4', '', 'block 3'][getRandomInteger(0, 2)],
  city: ['oxford', 'new york', 'palo alto'][getRandomInteger(0, 2)],
  state: ['PA', 'GA', 'TX', 'NJ', 'NY'][getRandomInteger(0, 4)],
  postalCode: ['19363', '12345', '76106'][getRandomInteger(0, 2)],
  country: 'US',
  phone: ['4625057890', '8374620897', '9023879056'][getRandomInteger(0, 2)],
  dayTradeProtection: ['yes', 'no'][getRandomInteger(0, 1)],
  employment: '',
  maritalStatus: '',
  dependants: ['6', '3', '4', '1', '13'][getRandomInteger(0, 3)],
  liquid: ['50000-99999', '200000-299999', '500000-999999', '5000000-max'][getRandomInteger(0, 3)],
  netWorth: ['50000-99999', '200000-299999', '500000-999999', '5000000-max'][getRandomInteger(0, 3)],
  yearlyIncome: ['75000-99999', '200000-299999', '500000-1999999', '1200000-max'][getRandomInteger(0, 3)],
  goal: ['preserveMySavings', 'growth', 'sourceOfIncome', 'speculationTrading', 'somethingElse'][getRandomInteger(0, 4)],
  timeLine: ['0-3', '4-7', '8-max'][getRandomInteger(0, 2)],
  experience: ['none', 'notMuch', 'knowMuch', 'expert'][getRandomInteger(0, 3)],
  riskTolerence: ['sellAll', 'sellSome', 'keepAll'][getRandomInteger(0, 2)],
  liquidity: ['notImportant', 'somewhatImportant', 'veryImportant'][getRandomInteger(0, 2)],
}

export const validCreditCard = {
  nameOnCard: `${userProfile.firstName} ${userProfile.lastName}`,
  cardNumber: '4242424242424242',
  expiryMonth: '12',
  expiryYear: '2090',
  cvc: '123',
}
export const invalidCreditCard = {
  nameOnCard: `${userProfile.firstName} ${userProfile.lastName}`,
  cardNumber: '9803782901890345',
  expiryMonth: '12',
  expiryYear: '2020',
  cvc: '123',
}
