import hashedPassword from "../../src/helpers/hashPassword";

export default {
  signup: {
    validClientDetails: {
      firstname: "Ashley",
      lastname: "Jones",
      email: "test@gmail.com",
      password: hashedPassword("password", 10),
      type: "Client",
      isAdmin: false,
      createdAt: new Date(),
      modifiedAt: null
    },
    validStaffDetails: {
      firstname: "James",
      lastname: "Barnes",
      email: "test@gmail.com",
      password: hashedPassword("password", 10),
      type: "Staff",
      isAdmin: true,
      createdAt: new Date(),
      modifiedAt: null
    },
    invalidUserDetails: {
      firstname: "Ashley",
      password: hashedPassword("password", 10),
      type: "emoji",
      isAdmin: false,
      createdAt: new Date(),
      modifiedAt: null
    }
  },
  login: {
    validLoginDetails: {
      email: "example@gmail.com",
      password: "password"
    },
    emptyLoginDetails: {
      email: "example@gmail.com",
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
