import { interval, take, filter, map, scan } from 'rxjs';

export const people: {
    name: string;
    age: number;
}[] = [
    { name: 'Vladilen', age: 25 },
    { name: 'Elena', age: 17 },
    { name: 'Ivan', age: 18 },
    { name: 'Igor', age: 14 },
    { name: 'Lisa', age: 32 },
    { name: 'Irina', age: 23 },
    { name: 'Oleg', age: 20 },
];

export const getIntervalRxJS = (
    next: null | ((value: string[]) => void),
    error: null | ((error: Error) => void),
    complite: null | (() => void),
) => {
    interval(1000).pipe(
        take(people.length),
        filter(v => people[v].age >= 18),
        map(v => people[v].name),
        scan((acc: string[], v: string) => acc.concat(v), [])
    )
    .subscribe({
        next(res) {
            next?.(res);
        },
        error(err) {
            error?.(err);
        },
        complete() {
            complite?.();
        },
    });
}