import React, { useState } from 'react';
import { interval, range, timer } from 'rxjs';

import { getIntervalRxJS, people } from './problem';
import { onReplaySubject as handleSubject } from './subjects';
import {
    clearCanvasMouseMoveStream,
    getCanvasMouseMoveStream,
} from './creation';
import './operators';

import './App.scss';



function App() {
    const [ intervalIsDisabled, setIntervalIsDisabled ] = useState(false);
    const [ rxjsIsDisabled, setRxjsIsDisabled ] = useState(false);
    const [ drinkers, setDrinkers ] = useState<string[]>([]);
    const [ canvas, setCanvas ] = useState<HTMLCanvasElement  | null>(null);

    const IntervalHandler = () => {
        setIntervalIsDisabled(true);
        let i = 0;
        setDrinkers([]);
        const interval = setInterval(() => {
            if (i < people.length) {
                const { age, name } = people[i];
                if (age >= 18) {
                    setDrinkers((drinkers) => [...drinkers, name]);
                };
                i += 1;
            } else {
                clearInterval(interval);
                setIntervalIsDisabled(false);
            }
        }, 1000);
    };

    const rxjsHandler = () => {
        setRxjsIsDisabled(true);
        getIntervalRxJS(
            (res: string[]) => setDrinkers(res),
            null,
            () => setRxjsIsDisabled(false),
        );
    };

    const handleDrow: React.MouseEventHandler<HTMLCanvasElement> =
        (e) => {
            getCanvasMouseMoveStream(e);
            setCanvas(e.target as HTMLCanvasElement);
        };

    const handleClear: React.MouseEventHandler<HTMLButtonElement> =
        (e) => clearCanvasMouseMoveStream(e, canvas);
    
    const sub = interval(500).subscribe(v => console.log(v));
    setTimeout(() => {
        sub.unsubscribe();
    }, 4000);

    timer(2500).subscribe(v => console.log(v));

    range(42, 10).subscribe(v => console.log(v));

    return (
        <div className="body" onClick={handleSubject}>
            <div className="container">
                <div className="problem">
                    <button
                        className="btn"
                        disabled={intervalIsDisabled}
                        onClick={IntervalHandler}
                    >
                        Показать с интервалом
                    </button>
                    <button
                        className="btn"
                        disabled={rxjsIsDisabled}
                        onClick={rxjsHandler}
                    >
                        Показать с RxJS
                    </button>
                    <div className="result" >{drinkers.join(' ')}</div>
                </div>
            </div>
            <div>
                <canvas
                    width={500}
                    height={200}
                    style={{
                        border: '1px solid #eee'
                    }}
                    onMouseMove={handleDrow}
                />
                <div>
                    <button
                        className="btn"
                        onClick={handleClear}
                    >
                        Очистить
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
