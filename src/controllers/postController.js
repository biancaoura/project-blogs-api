const { postService, categoryService } = require('../services');
const getUserId = require('../helpers/getUserId');
const httpStatus = require('../utils/httpStatus');

const getPosts = async (_req, res) => {
  const posts = await postService.getPosts();
  
  res.status(httpStatus.OK).json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  const post = await postService.getPostById(id);

  if (!post) {
    return res.status(httpStatus.NOT_FOUND).json({ message: 'Post does not exist' });
  }

  res.status(httpStatus.OK).json(post);
};

// const getUserId = async (email) => {
//   const userData = await userService.getUserByEmail(email);
//   return userData.dataValues.id;
// };

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;       
  
  const allCategories = await categoryService.getCategories();
  const existingIds = allCategories.map(({ dataValues: { id } }) => id);
  const isIdValid = categoryIds.every((id) => existingIds.includes(id));

  if (!isIdValid) { 
    return res.status(httpStatus.BAD_REQ).json({ message: 'one or more "categoryIds" not found' }); 
  }
  
  const userId = await getUserId(req.decoded.payload);
  const newPost = await postService.createPost(userId, title, content, categoryIds);
  
  res.status(httpStatus.CREATED).json(newPost);
};

const getPostAuthorId = async (postId) => {
  const doesPostExist = await postService.getPostById(postId);

  if (!doesPostExist) return { error: httpStatus.NOT_FOUND, message: 'Post does not exist' };

  const authorId = doesPostExist.dataValues.userId;
  return { authorId };
};

const updatePost = async (req, res) => {
  const { id: postId } = req.params;

  const userId = await getUserId(req.decoded.payload);

  const { error, message, authorId } = await getPostAuthorId(postId);
  if (error) return res.status(error).json({ message });

  if (userId !== authorId) { 
    return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Unauthorized user' });
  }
  
  await postService.updatePost(postId, req.body);

  const updatedPost = await postService.getPostById(postId);

  return res.status(httpStatus.OK).json(updatedPost);
};

const deletePost = async (req, res) => {
  const { id: postId } = req.params;

  const userId = await getUserId(req.decoded.payload);

  const { error, message, authorId } = await getPostAuthorId(postId);
  if (error) return res.status(error).json({ message });

  if (userId !== authorId) { 
    return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Unauthorized user' });
  }
  await postService.deletePost(postId);

  res.status(httpStatus.NO_CONTENT).end();
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};