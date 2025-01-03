const { gql } = require('apollo-server-express');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    author: String!
    createdAt: String!
    comments: [Comment]!
  }

  type Comment {
    id: ID!
    content: String!
    author: String!
    createdAt: String!
    postId: ID!
  }

  type Query {
    posts(sortBy: String): [Post]!
    post(id: ID!): Post
  }

  type Mutation {
    createPost(title: String!, content: String!, author: String!): Post!
    addComment(postId: ID!, content: String!, author: String!): Comment!
    deletePost(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    posts: async (_, { sortBy }) => {
      const order = sortBy === 'oldest' ? [['createdAt', 'ASC']] : [['createdAt', 'DESC']];
      return await Post.findAll({ order });
    },
    post: async (_, { id }) => {
      return await Post.findByPk(id, { include: 'comments' });
    },
  },
  Mutation: {
    createPost: async (_, { title, content, author }) => {
      return await Post.create({ title, content, author });
    },
    addComment: async (_, { postId, content, author }) => {
      const post = await Post.findByPk(postId);
      if (!post) {
        throw new Error('Post not found');
      }
      return await Comment.create({ postId, content, author });
    },
    deletePost: async (_, { id }) => {
      const post = await Post.findByPk(id);
      if (!post) {
        return false;
      }
      await post.destroy();
      return true;
    },
  },
  Post: {
    comments: async (post) => {
      return await post.getComments();
    },
  },
};

module.exports = { typeDefs, resolvers };

