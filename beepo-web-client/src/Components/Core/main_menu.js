import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './core.css';

export const MainMenu = () => (
    <div className='main-menu'>
        <Link to="/prizes">
            <button className='button'>Prizes</button>
        </Link>
        <Link to="/hint">
            <button className='button'>Hint</button>
        </Link>
        <Link to="/leader-boards">
            <button className='button'>Leader Boards</button>
        </Link>
        <Link to="/sign-in">
            <button className='button'>Sign-in</button>
        </Link>
    </div>
);