import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const ADD_COMMENT = gql`
  mutation AddComment($postId: Int!, $author: String!, $comment: String!) {
    addComment(postId: $postId, author: $author, comment: $comment) {
      id
      author
      comment
    }
  }
`;

export default function CommentForm({ postId }: { postId: number }) {
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [addComment] = useMutation(ADD_COMMENT);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addComment({
        variables: { postId, author, comment },
      });
      setAuthor('');
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Your name"
        required
      />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Your comment"
        required
      />
      <button type="submit">Add Comment</button>
    </form>
  );
}

