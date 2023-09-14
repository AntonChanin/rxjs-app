import React from 'react';

import './App.scss';

function App() {
    return (
        <div>
            <div className="container">
                <div className="problem">
                    <button className="btn" id="interval">Показать с интервалом</button>
                    <button className="btn" id="rxjs">Показать с RxJS</button>
                    <div className="result" />
                </div>
            </div>
        </div>
    );
}

export default App;
