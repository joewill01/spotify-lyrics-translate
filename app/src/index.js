import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthContext, AuthProvider, TAuthConfig, TRefreshTokenExpiredEvent } from "react-oauth2-code-pkce"

import './index.css';

import App from './App.js';

const authConfig = {
  clientId: '44cb5b971a464d2cbda6462bc02b2357',
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
  redirectUri: 'http://localhost:3000/callback',
  scope: 'streaming',
  decodeToken: false,
  autoLogin: false,
  logoutRedirect: '/',
  onRefreshTokenExpire: (event) => event.logIn(undefined, undefined, "popup"),
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider authConfig={authConfig}>
    <div className="macos-window-controls">
    </div>

    <App />
  </AuthProvider>
);
