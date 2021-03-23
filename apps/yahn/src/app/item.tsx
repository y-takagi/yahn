import React from 'react';
import dayjs from 'dayjs';

import { ItemDto } from './api/data';

interface ItemProps {
  item: ItemDto;
}

export function Item(props: ItemProps) {
  const item = props.item;

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap">
        <div className="pr-2">{item.title}</div>
        {item.url != null && (
          <a
            className="hover:underline text-gray-800"
            href={item.url}
            target="_blank"
          >
            ({new URL(item.url).host})
          </a>
        )}
      </div>
      <div className="text-gray-800">
        {item.score} point by {item.by} {dayjs.unix(item.time).fromNow()}
      </div>
    </div>
  );
}
