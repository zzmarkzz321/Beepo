import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './core.css';

export const MainMenu = () => (
    <div className='main-menu'>
        <Link to="/prizes">
            <button>Prizes</button>
        </Link>
        <Link to="/hint">
            <button>Hint</button>
        </Link>
        <Link to="/leader-boards">
            <button>Leader Boards</button>
        </Link>
        <Link to="/sign-in">
            <button>Sign-in</button>
        </Link>
    </div>
);