const { BlogPost, PostCategory, User, Category } = require('../models');

const getPosts = () => BlogPost.findAll({
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories' },
  ],
});

const createPost = async (userId, title, content, categoryIds) => {
  const newPost = await BlogPost.create({ userId, title, content });

  const newPostCategory = await categoryIds.map((categoryId) =>
    PostCategory.create({ postId: newPost.id, categoryId }));

  await Promise.all(newPostCategory);
  return newPost;
};

module.exports = {
  getPosts,
  createPost,
};