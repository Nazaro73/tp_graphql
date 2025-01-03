import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import { useState } from 'react';

const GET_POSTS = gql`
  query GetPosts($order: String) {
    posts(order: $order) {
      id
      title
      author
      createdAt
    }
  }
`;

export default function PostList() {
  const [sortOrder, setSortOrder] = useState<'new' | 'old'>('new');
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { order: sortOrder === 'new' ? 'DESC' : 'ASC' },
  });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div>
      <h1>Liste des posts</h1>
      <button onClick={() => setSortOrder(sortOrder === 'new' ? 'old' : 'new')}>
        Trier par {sortOrder === 'new' ? 'plus anciens' : 'plus récents'}
      </button>
      <ul>
        {data.posts.map((post: any) => (
          <li key={post.id}>
            <Link href={`/post/${post.id}`}>
              <a>{post.title}</a>
            </Link>
            <p>Par {post.author} le {new Date(post.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

