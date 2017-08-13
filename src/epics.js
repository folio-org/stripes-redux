import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'; // eslint-disable-line
import 'rxjs/add/operator/mergeMap'; // eslint-disable-line

export default function configureEpics(...initialEpics) {
  const epic$ = new BehaviorSubject(combineEpics(...initialEpics));
  const rootEpic = (action$, store) =>
    epic$.mergeMap(epic => epic(action$, store));
  const middleware = createEpicMiddleware(rootEpic);

  return {
    middleware,
    add: (...epics) => {
      epics.forEach(epic => epic$.next(epic));
    },
  };
}
