import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useRouter } from 'next/router';

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!, $author: String!) {
    createPost(title: $title, content: $content, author: $author) {
      id
      title
      content
      author
      createdAt
    }
  }
`;

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [createPost] = useMutation(CREATE_POST);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await createPost({ variables: { title, content, author } });
      router.push(`/post/${data.createPost.id}`);
    } catch (error) {
      console.error('Erreur lors de la création du post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Contenu"
        required
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Auteur"
        required
      />
      <button type="submit">Créer le post</button>
    </form>
  );
}

