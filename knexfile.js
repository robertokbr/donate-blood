const path=  require('path');

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'Database', 'database.sqlite'),
  },
  migrations: {
    directory: path.resolve(__dirname, 'Database', 'migrations'),
  },
  seeds:{
    directory: path.resolve(__dirname, 'Database', 'seeds'),
  },

  useNullAsDefault: true,
};
