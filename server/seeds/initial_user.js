const bcrypt = require('bcryptjs');


exports.seed = async function(knex) {
  const hashedPassword = await bcrypt.hash('admin_password', 10);

  await knex('users').insert([
    { username: 'admin', password: hashedPassword, role: 'admin' }
  ]);
};
