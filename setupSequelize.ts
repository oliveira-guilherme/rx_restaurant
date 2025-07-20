import sequelize from './src/db/sequelize'

import Customer from './src/db/models/Customer'

(async () => {
  try {
    await sequelize.sync({ force: false }); // force: true recria as tabelas
    console.log('Tabelas sincronizadas com sucesso!');
  } catch (err) {
    console.error('Erro ao sincronizar:', err);
  }
})()
