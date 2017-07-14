import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import './operators';

const epic$ = new BehaviorSubject(combineEpics());
const rootEpic = (action$, store) =>
  epic$.mergeMap(epic => epic(action$, store));

export const epicMiddleware = createEpicMiddleware(rootEpic);

export function addEpic(epic) {
  return epic$.next(epic);
}

export function addEpics(epics) {
  if (!epics || !epics.length) return;
  epics.forEach(epic => addEpic(epic));
}
