import React from 'react';
import ReactDOM from 'react-dom/client';
import Socket from './components/socket';

const App = () => {
    return(
        <div>
            <Socket/>
        </div>
    )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)
