import hashedPassword from "../src/helpers/hashPassword";

export default [
  {
    email: "\'example@gmail.com\'",
    first_name: "\'John\'",
    last_name: "\'Doe\'",
    password: `\'${hashedPassword("password", 10)}\'`,
    type: "\'Client\'",
    is_admin: '\'false\'',
    
    
  },
  {
    email: "\'emoji@gmail.com\'",
    first_name: "\'John\'",
    last_name: "\'Doe\'",
    password: `\'${hashedPassword("password", 10)}\'`,
    type: "\'Staff\'",
    is_admin: '\'false\'',
  }
];

