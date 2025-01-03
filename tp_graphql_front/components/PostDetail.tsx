import { gql, useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';

const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      content
      author
      createdAt
      comments {
        id
        content
        author
        createdAt
      }
    }
  }
`;

const ADD_COMMENT = gql`
  mutation AddComment($postId: ID!, $content: String!, $author: String!) {
    addComment(postId: $postId, content: $content, author: $author) {
      id
      content
      author
      createdAt
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

export default function PostDetail({ id }: { id: string }) {
  const { loading, error, data } = useQuery(GET_POST, { variables: { id } });
  const [addComment] = useMutation(ADD_COMMENT);
  const [deletePost] = useMutation(DELETE_POST);
  const [commentContent, setCommentContent] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    await addComment({
      variables: { postId: id, content: commentContent, author: commentAuthor },
      refetchQueries: [{ query: GET_POST, variables: { id } }],
    });
    setCommentContent('');
    setCommentAuthor('');
  };

  const handleDeletePost = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
      await deletePost({ variables: { id } });
      window.location.href = '/';
    }
  };

  return (
    <div>
      <h1>{data.post.title}</h1>
      <p>Par {data.post.author} le {new Date(data.post.createdAt).toLocaleDateString()}</p>
      <p>{data.post.content}</p>
      <button onClick={handleDeletePost}>Supprimer ce post</button>
      <h2>Commentaires</h2>
      <ul>
        {data.post.comments.map((comment: any) => (
          <li key={comment.id}>
            <p>{comment.content}</p>
            <p>Par {comment.author} le {new Date(comment.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddComment}>
        <input
          type="text"
          value={commentAuthor}
          onChange={(e) => setCommentAuthor(e.target.value)}
          placeholder="Votre nom"
          required
        />
        <textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Votre commentaire"
          required
        />
        <button type="submit">Ajouter un commentaire</button>
      </form>
    </div>
  );
}

