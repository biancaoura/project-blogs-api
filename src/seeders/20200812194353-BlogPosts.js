module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('blog_posts',
      [
        {
          id: 1,
          title: 'Best dog breeds for hunting',
          content: 'Here are the best hunting companions',
          user_id: 1,
          published: new Date('2011-08-01T19:58:00.000Z'),
          updated: new Date('2011-08-01T19:58:51.000Z'),
        },
        {
          id: 2,
          title: 'Great books about the Silk Road',
          content: 'These are some must-read books about the Silk Road',
          user_id: 1,
          published: new Date('2011-08-01T19:58:00.000Z'),
          updated: new Date('2011-08-01T19:58:51.000Z'),
        },
      ]);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('blog_posts', null, {});
  },
};
