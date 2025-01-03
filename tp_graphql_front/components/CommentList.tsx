export default function CommentList({ comments }: { comments: any[] }) {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          <p>{comment.comment}</p>
          <p>By {comment.author}</p>
        </li>
      ))}
    </ul>
  );
}

