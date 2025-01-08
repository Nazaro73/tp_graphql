const { gql } = require('apollo-server-express');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

// Type Definitions
const typeDefs = gql`
  type Post {
    id: ID!
    author: String!
    createdAt: String!
    url: String!
    title: String!
    comments: [Comment]
  }

  type Comment {
    id: ID!
    author: String!
    comment: String!
    postId: Int!
  }

  type Query {
    posts(order: String): [Post]
    post(id: ID!): Post
  }

  type Mutation {
    createPost(author: String!, url: String!, title: String!): Post
    addComment(postId: Int!, author: String!, comment: String!): Comment
    deletePost(id: ID!): Boolean
  }
`;

// Resolvers
const resolvers = {
  Query: {
    posts: async (_, { order }) => {
      const orderOption = order === 'new' ? 'DESC' : 'ASC';
      return await Post.findAll({ order: [['createdAt', orderOption]] });
    },
    post: async (_, { id }) => {
      return await Post.findByPk(id, { include: [{ model: Comment, as: 'comments' }] });
    }
  },
  Mutation: {
    createPost: async (_, { author, url, title }) => {
      return await Post.create({ author, url, title });
    },
    addComment: async (_, { postId, author, comment }) => {
      return await Comment.create({ postId, author, comment });
    },
    deletePost: async (_, { id }) => {
      const post = await Post.findByPk(id);
      if (!post) {
        return false;
      }
      await post.destroy();
      return true;
    }
  },
  Post: {
    comments: async (post) => {
      return await Comment.findAll({ where: { postId: post.id } });
    }
  }
};

module.exports = { typeDefs, resolvers };
