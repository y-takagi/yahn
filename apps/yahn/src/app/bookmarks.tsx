import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';

import { ItemDto } from './api/data';
import { hackerNewsApi } from './api';
import { useBookmarksContext } from './context';
import { Items } from './items';

export function Bookmarks() {
  const [bookmarksState] = useBookmarksContext();
  const [itemsState, setItems] = useState<ItemDto[]>([]);
  const [isLoadingState, setIsLoading] = useState(false);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    setIsLoading(true);
    try {
      const items = await Promise.all(
        bookmarksState.map((id) => hackerNewsApi.getItem(id))
      );
      setItems(items);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {isLoadingState ? (
        <CircularProgress />
      ) : (
        <>
          {itemsState.length > 0 ? (
            <Items items={itemsState} />
          ) : (
            <div className="text-center text-gray-500">No bookmarks</div>
          )}
        </>
      )}
    </div>
  );
}
