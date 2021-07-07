import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin user',
    email: 'admin@dominique.com',
    password: bcrypt.hashSync('12345678', 13),
    isAdmin: true,
  },
  {
    name: 'Dominique',
    email: 'test@gmail.com',
    password: bcrypt.hashSync('12345678', 13),
  },
  {
    name: 'DiPierro',
    email: 'test2@gmail.com',
    password: bcrypt.hashSync('12345678', 13),
  },
  {
    name: 'DiPierro',
    email: 'test3@gmail.com',
    password: bcrypt.hashSync('12345678', 13),
  },
  {
    name: 'DiPierro',
    email: 'test4@gmail.com',
    password: bcrypt.hashSync('12345678', 13),
  },
  {
    name: 'DiPierro',
    email: 'test5@gmail.com',
    password: bcrypt.hashSync('12345678', 13),
  },
  {
    name: 'DiPierro',
    email: 'test6@gmail.com',
    password: bcrypt.hashSync('12345678', 13),
  },
  {
    name: 'DiPierro',
    email: 'test7@gmail.com',
    password: bcrypt.hashSync('12345678', 13),
  },
  {
    name: 'DiPierro',
    email: 'test8@gmail.com',
    password: bcrypt.hashSync('12345678', 13),
  },
  {
    name: 'DiPierro',
    email: 'test9@gmail.com',
    password: bcrypt.hashSync('12345678', 13),
  },
  {
    name: 'DiPierro',
    email: 'test10@gmail.com',
    password: bcrypt.hashSync('12345678', 13),
  },
];

export default users;
