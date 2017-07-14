import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';

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
