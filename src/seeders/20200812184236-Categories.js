module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('categories',
      [
        {
          id: 1,
          name: 'Animals',
        },
        {
          id: 2,
          name: 'Books',
        },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
