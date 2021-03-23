import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import dayjs from 'dayjs';

import { ItemDto } from './api/data';
import { useBookmarksContext } from './context';

interface ItemProps {
  item: ItemDto;
}

export function Item(props: ItemProps) {
  const [bookmarksState, setBookmarks] = useBookmarksContext();
  const [isBookmarkedState, setIsBookmarked] = useState(false);
  const { item } = props;

  useEffect(() => {
    const isBookmarked = bookmarksState.includes(item.id);
    setIsBookmarked(isBookmarked);
  }, []);

  const onBookmark = () => {
    if (isBookmarkedState) {
      setBookmarks(bookmarksState.filter((id) => id !== item.id));
    } else {
      setBookmarks([...bookmarksState, item.id]);
    }
    setIsBookmarked(!isBookmarkedState);
  };

  return (
    <div className="flex items-start">
      <IconButton onClick={onBookmark}>
        {isBookmarkedState ? <BookmarkIcon /> : <BookmarkBorderOutlinedIcon />}
      </IconButton>
      <div className="flex flex-col">
        <div className="flex flex-wrap text-blue-500">
          <Link className="hover:underline pr-2" to={'/items/' + item.id}>
            {item.title}
          </Link>
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
          {`${item.score} point by ${item.by} ${dayjs
            .unix(item.time)
            .fromNow()}`}
        </div>
      </div>
    </div>
  );
}
