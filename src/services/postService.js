const { BlogPost, PostCategory } = require('../models');

const createPost = async (userId, title, content, categoryIds) => {
  const newPost = await BlogPost.create({ userId, title, content });

  const newPostCategory = await categoryIds.map((categoryId) =>
    PostCategory.create({ postId: newPost.id, categoryId }));

  await Promise.all(newPostCategory);
  return newPost;
};

module.exports = {
  createPost,
};