import React from 'react';
import dayjs from 'dayjs';

import styles from './comment.module.scss';
import { ItemDto } from './api/data';

interface CommentProps {
  item: ItemDto;
}

export function Comment(props: CommentProps) {
  const { item } = props;

  return (
    <div className="flex flex-col text-sm">
      <div className="text-gray-500">{`${item.by} ${dayjs
        .unix(item.time)
        .fromNow()}`}</div>
      <div
        className={`text-gray-800 ${styles.text} break-all`}
        dangerouslySetInnerHTML={{ __html: item.text ?? '' }}
      />
    </div>
  );
}
