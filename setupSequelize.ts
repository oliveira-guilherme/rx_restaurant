import sequelize from './src/db/sequelize'

(async () => {
  try {
    await sequelize.sync({ force: false }); // force: true recria as tabelas
    console.log('Tabelas sincronizadas com sucesso!');
  } catch (err) {
    console.error('Erro ao sincronizar:', err);
  }
})()
