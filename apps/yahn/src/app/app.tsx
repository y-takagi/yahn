import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import BookmarkIcon from '@material-ui/icons/Bookmark';

import { BookmarksContext } from './context';
import { Newstories } from './newstories';
import { ItemDetail } from './item-detail';
import { Bookmarks } from './bookmarks';

export function App() {
  const bookmarksState = useState<number[]>([]);

  return (
    <Router>
      <div className="max-w-screen-lg mx-auto p-4">
        <header className="mb-4 flex items-center space-x-8">
          <h1 className="text-lg">
            <Link to="/">Hacker News</Link>
          </h1>
          <Link to="/bookmarks" className="flex items-center">
            <BookmarkIcon />
            <span>bookmarks</span>
          </Link>
        </header>
        <main>
          <BookmarksContext.Provider value={bookmarksState}>
            <Switch>
              <Route path="/bookmarks" component={Bookmarks} />
              <Route path="/items/:id(\d+)" component={ItemDetail} />
              <Route path="/" component={Newstories} />
            </Switch>
          </BookmarksContext.Provider>
        </main>
      </div>
    </Router>
  );
}
