import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

export const onSubject =  () => {
    const stream$ = new Subject();

    stream$.subscribe(v => console.log(v));
    stream$.next('Hello');
    stream$.next('Rx');
    stream$.next('JS');
};

export const onBehaviorSubject =  () => {
    const stream$ = new BehaviorSubject('First!');

    stream$.subscribe(v => console.log(v));
    stream$.next('Hello');
    stream$.next('Rx');
    stream$.next('JS');
};

export const onReplaySubject =  () => {
    const stream$ = new ReplaySubject(2);

    stream$.next('Hello');
    stream$.next('Rx');
    stream$.next('JS');
    stream$.subscribe(v => console.log(v));
};