import React, { useContext } from 'react';
import { AuthContext } from 'react-oauth2-code-pkce'

import './Welcome.css';


function Welcome() {

    const { token, logIn, error } = useContext(AuthContext)

    return (
        <div className="Welcome">
            <h1 className="Welcome__header">Welcome to Lyric<span className="Welcome__header-gradient">Translate</span></h1>
            <span className="Welcome__spacer"></span>
            <p className="Welcome__subtext">To get started, you’ll need to link your Spotify account.</p>
            <p className="Welcome__subtext">{token?token:""}</p>
            <button className="Welcome__button" onClick={() => {logIn(undefined, undefined, "popup")}}>CONNECT TO SPOTIFY</button>
      	</div>
    );
  }
  
  export default Welcome;
