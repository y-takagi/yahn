import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

import { hackerNewsApi } from './api';
import { ItemDto } from './api/data';
import { CommentItem, Comments } from './comments';
import { Item } from './item';

async function fetchCommentItems(ids: number[]): Promise<CommentItem[]> {
  if (ids.length == 0) {
    return [];
  }
  const items = await Promise.all(ids.map((id) => hackerNewsApi.getItem(id)));
  return Promise.all(
    items
      .filter((item) => !item.deleted)
      .map(async (item) => ({
        item,
        commentItems: await fetchCommentItems(item.kids ?? []),
      }))
  );
}

export function ItemDetail() {
  const { id } = useParams<{ id?: string }>();

  const [itemState, setItem] = useState<ItemDto | null>(null);
  const [commentItemsState, setCommentItems] = useState<CommentItem[]>([]);
  const [isLoadingState, setIsLoading] = useState(false);

  useEffect(() => {
    if (id == null) {
      return;
    }
    fetch(Number(id));
  }, []);

  const fetch = async (id: number) => {
    setIsLoading(true);
    try {
      const item = await hackerNewsApi.getItem(id);
      setItem(item);
      const comments = await fetchCommentItems(item.kids ?? []);
      setCommentItems(comments);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoadingState ? (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          {itemState != null && (
            <div className="flex flex-col space-y-6">
              <Item item={itemState} />
              <Comments commentItems={commentItemsState} />
            </div>
          )}
        </>
      )}
    </>
  );
}
