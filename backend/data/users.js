import bcrypt from 'bcryptjs';

const users = [
    {
      name: 'Admin user',
      email: 'admin@geminids.com',
      password: bcrypt.hashSync('12345678', 13),
      isAdmin: true
    },
    {
      name: 'Shawn',
      email: 'shawnlaw6669@gmail.com',
      password: bcrypt.hashSync('12345678', 13),
    },
    {
      name: 'John DOE',
      email: 'johndoe@gmail.com',
      password: bcrypt.hashSync('12345678', 13),
    },
];

export default users;
