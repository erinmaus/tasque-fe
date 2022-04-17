import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Base from '../Base';
import Home from '../Home';

function TableOfContents(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Base />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default TableOfContents;
