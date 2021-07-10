import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin user',
    email: 'admin@dominique.com',
    password: bcrypt.hashSync('12345678', 13),
    isAdmin: true,
  },
  {
    name: 'Dominique DiPierro',
    email: 'test@gmail.com',
    password: bcrypt.hashSync('12345678', 13),
  },
  {
    name: 'Dominique DiPierro',
    email: 'test2@gmail.com',
    password: bcrypt.hashSync('12345678', 13),
  },
  {
    name: 'Dominique DiPierro',
    email: 'test3@gmail.com',
    password: bcrypt.hashSync('12345678', 13),
  },
  {
    name: 'Dominique DiPierro',
    email: 'test4@gmail.com',
    password: bcrypt.hashSync('12345678', 13),
  },
  {
    name: 'Dominique DiPierro',
    email: 'test5@gmail.com',
    password: bcrypt.hashSync('12345678', 13),
  },
  {
    name: 'Dominique DiPierro',
    email: 'test6@gmail.com',
    password: bcrypt.hashSync('12345678', 13),
  },
  {
    name: 'Dominique DiPierro',
    email: 'test7@gmail.com',
    password: bcrypt.hashSync('12345678', 13),
  },
  {
    name: 'Dominique DiPierro',
    email: 'test8@gmail.com',
    password: bcrypt.hashSync('12345678', 13),
  },
  {
    name: 'Dominique DiPierro',
    email: 'test9@gmail.com',
    password: bcrypt.hashSync('12345678', 13),
  },
  {
    name: 'Dominique DiPierro',
    email: 'test10@gmail.com',
    password: bcrypt.hashSync('12345678', 13),
  },
];

export default users;
