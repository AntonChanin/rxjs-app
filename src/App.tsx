import React, { useState } from 'react';
import { interval, fromEvent } from 'rxjs';
import { filter, map, take, scan } from 'rxjs/operators';

import { people } from './problem';
import './creation';

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
        interval(1000).pipe(
            take(people.length),
            filter(v => people[v].age >= 18),
            map(v => people[v].name),
            scan((acc: string[], v: string) => acc.concat(v), [])
        )
        .subscribe({
            next(res) { setDrinkers(res); },
            complete() { setRxjsIsDisabled(false); },
        });
    };

    const handleDrow: React.MouseEventHandler<HTMLCanvasElement> =
        (e) => {
            fromEvent<MouseEvent>(e.target, 'mousemove')
                .pipe(
                    map((e) => ({
                        x: e.offsetX,
                        y: e.offsetY,
                        ctx: (e.target as HTMLCanvasElement).getContext('2d'),
                    })),
                )
                .subscribe(
                    pos => {
                        pos.ctx?.fillRect(pos.x, pos.y, 2, 2);
                       
                    }
                );
            setCanvas(e.target as HTMLCanvasElement);
        };

    const handleClear: React.MouseEventHandler<HTMLButtonElement> =
        (e) =>
            fromEvent<MouseEvent>(e.target, 'click')
                .subscribe({
                    next() {
                        canvas?.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
                    },
                });

    return (
        <div className="body">
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
