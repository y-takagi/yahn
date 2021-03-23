import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { CircularProgress } from '@material-ui/core';

import { hackerNewsApi } from './api';
import { ItemDto } from './api/data';
import { Items } from './items';

const PER_PAGE = 30;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function getMaxPage(total: number): number {
  return Math.ceil(total / PER_PAGE);
}

function getItemRange(page: number): [number, number] {
  return [PER_PAGE * (page - 1), PER_PAGE * page];
}

export function Newstories() {
  const [storiesState, setStories] = useState<ItemDto[]>([]);
  const [totalState, setTotal] = useState<number>(0);
  const [isLoadingState, setIsLoading] = useState<boolean>(false);
  const [pageState, setPage] = useState<number>(0);
  const query = useQuery();
  const location = useLocation();

  useEffect(() => {
    const page = Number(query.get('p') || '1');
    if (isNaN(page)) {
      return;
    }
    setPage(Math.max(page, 1));
  }, [location]);

  useEffect(() => {
    fetchStories();
  }, [pageState]);

  const fetchStories = async () => {
    if (pageState === 0) {
      return;
    }
    setIsLoading(true);
    try {
      const storyIds = await hackerNewsApi.getNewstories();
      const [start, end] = getItemRange(pageState);
      const stories = await Promise.all(
        storyIds.slice(start, end).map((id) => hackerNewsApi.getItem(id))
      );
      setStories(stories);
      setTotal(storyIds.length);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {isLoadingState ? (
        <CircularProgress />
      ) : (
        <>
          <Items items={storiesState} />
          <Pagination
            page={pageState}
            count={getMaxPage(totalState)}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/${item.page === 1 ? '' : `?p=${item.page}`}`}
                {...item}
              />
            )}
          />
        </>
      )}
    </div>
  );
}
