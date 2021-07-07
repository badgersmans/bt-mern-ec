import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin user',
    email: 'admin@dominique.com',
    password: bcrypt.hashSync('12345678', 13),
    isAdmin: true,
  },
  {
    name: 'Dominique_59',
    email: 'dominique59@gmail.com',
    password: bcrypt.hashSync('12345678', 13),
  },
  {
    name: 'DiPierro',
    email: 'test@gmail.com',
    password: bcrypt.hashSync('12345678', 13),
  },
];

export default users;
