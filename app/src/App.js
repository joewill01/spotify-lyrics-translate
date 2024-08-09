import { useState, useContext } from 'react';
import { AuthContext } from 'react-oauth2-code-pkce'

import Player from './Player';
import Welcome from './Welcome';


function App() {
    let [page, setPage] = useState(true);
    const { token, error } = useContext(AuthContext);

    return (
        <div>
		{token ? <Player /> : <Welcome/>}
        </div>
    );
  }
  
  export default App;