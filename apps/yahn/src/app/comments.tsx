import React from 'react';

import { ItemDto } from './api/data';
import { Comment } from './comment';

export interface CommentItem {
  item: ItemDto;
  commentItems: CommentItem[];
}

interface CommentsProps {
  commentItems: CommentItem[];
}

export function Comments(props: CommentsProps) {
  const { commentItems } = props;

  const comments = commentItems.map((commentItem) => (
    <div key={commentItem.item.id} className="flex flex-col space-y-4">
      <Comment item={commentItem.item} />
      {commentItem.commentItems.length > 0 && (
        <Comments commentItems={commentItem.commentItems} />
      )}
    </div>
  ));
  return <div className="flex flex-col space-y-4 pl-4">{comments}</div>;
}
