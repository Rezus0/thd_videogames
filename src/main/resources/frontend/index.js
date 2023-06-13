import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import GameList from './game/GameList';
import MainPage from "./MainPage";

ReactDOM.render(
    <Router>
        <Routes>
            <Route path="/" element={<MainPage />} />
        </Routes>
    </Router>,
    document.getElementById('root')
);
