const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content;
    if (comment.status === 'approved') {
      content = comment.content;
    } else if (comment.status === 'pending') {
      content = 'Waiting for approval';
    } else {
      content = 'Comment is rejected';
    }
    return (
      <li key={comment.id} style={{ marginBottom: "10px" }}>
        {content}
      </li>
    );
  });
  return <ul>{renderedComments}</ul>;
};

export default CommentList;
