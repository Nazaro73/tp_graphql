import { useRouter } from 'next/router';
import PostDetail from '../../components/PostDetail';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return null;

  return <PostDetail id={id as string} />;
}

