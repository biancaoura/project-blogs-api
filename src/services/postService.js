const { BlogPost, PostCategory, User, Category } = require('../models');
const { sequelize } = require('../models');

const getPosts = () => BlogPost.findAll({
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

const getPostById = (id) => BlogPost.findByPk(id, {
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

const createPost = async (userId, title, content, categoryIds) => {
  try {
    const newPost = await sequelize.transaction(async (t) => {
      const post = await BlogPost.create({ userId, title, content },
        { transaction: t });
    
      const newPostCategory = categoryIds.map((categoryId) =>
      PostCategory.create({ postId: post.id, categoryId }, { transaction: t }));

      await Promise.all(newPostCategory);
      return post;
    });
    
    return newPost;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

const updatePost = (id, { title, content }) =>
  BlogPost.update({ title, content }, { where: { id } });

const deletePost = (id) => BlogPost.destroy({ where: { id } });

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};