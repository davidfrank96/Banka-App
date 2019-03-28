import hashedPassword from "../src/helpers/hashPassword";

export default [
  {
    id: 1,
    email: "example@gmail.com",
    firstname: "John",
    lastname: "Doe",
    password: hashedPassword("password", 10),
    type: "Client",
    isAdmin: false,
    createdAt: new Date(),
    modifiedAt: null
  },
  {
    id: 2,
    email: "emoji@gmail.com",
    firstname: "Jane",
    lastname: "Doe",
    password: hashedPassword("password", 10),
    type: "Staff",
    isAdmin: true,
    createdAt: new Date(),
    modifiedAt: null
  }
];
