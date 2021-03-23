import { useContext, createContext } from 'react';

export const BookmarksContext = createContext<
  [number[], React.Dispatch<React.SetStateAction<number[]>>]
>([[], () => {}]);

export const useBookmarksContext = () => useContext(BookmarksContext);
