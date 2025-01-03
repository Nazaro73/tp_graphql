import PostList from '../components/PostList';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Bienvenue sur notre application de news</h1>
      <Link href="/create-post">
        <a>Créer un nouveau post</a>
      </Link>
      <PostList />
    </div>
  );
}

