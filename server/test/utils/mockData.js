import hashedPassword from '../../src/helpers/hashPassword';

export default {
  signup: {
    validClientDetails: {
      first_name: "John",
      last_name: "Doe",
      email: "john@gmail.com",
      password: hashedPassword("password", 10),
      type: "Client",
      isAdmin: false,
      createdAt: new Date(),
      modifiedAt: null
    },
    validStaffDetails: {
      first_name: "Frank",
      last_name: "Frank",
      email: "frank@gmail.com",
      password: hashedPassword("password", 10),
      type: "Staff",
      isAdmin: true,
      createdAt: new Date(),
      modifiedAt: null
    },
    invalidUserDetails: {
      first_name: "Ashley",
      password: hashedPassword("password", 10),
      type: "emoji",
      isAdmin: false,
      createdAt: new Date(),
      modifiedAt: null
    }
  },
  login: {
    validLoginDetails: {
      email: "frank@gmail.com",
      password: "password"
    },
    emptyLoginDetails: {
      email: "frank@gmail.com",
      password: ""
    },
    invalidLoginDetails: {
      email: "wrong@gmail.com",
      password: "password"
    }
  },
  account: {
    validAccountDetails: {
      type: "savings",
      balance: 12000
    },
    emptyAccountDetails: {
      balance: 10000
    }
  },
  transaction: {
    validTransaction: {
      amount: 10000
    },
    emptyTransaction: {
      amount: ""
    },
    excessTransaction: {
      amount: 100000
    }
  }
};
