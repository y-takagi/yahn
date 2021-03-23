import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import { Newstories } from './newstories';
import { ItemDetail } from './item-detail';

export function App() {
  return (
    <Router>
      <div className="max-w-screen-lg mx-auto p-4">
        <header className="mb-4">
          <h1 className="text-lg">
            <Link to="/">Hacker News</Link>
          </h1>
        </header>
        <main>
          <Switch>
            <Route path="/items/:id(\d+)" component={ItemDetail} />
            <Route path="/" component={Newstories} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}
