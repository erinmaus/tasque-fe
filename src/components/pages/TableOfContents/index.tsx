import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Base from '../Base';
import Home from '../Home';
import Project from '../Project';
import Sprints from '../Sprints';
import Ticket from '../Ticket';

function TableOfContents(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Base />}>
          <Route index element={<Home />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/project/:id/sprints" element={<Sprints />} />
          <Route path="/project/:projectID/ticket/:ticketID" element={<Ticket />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default TableOfContents;
