import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { asyncActionError, asyncActionFinish, asyncActionStart } from '../../redux/actions/asyncActions';
import { transformSnapshot } from '../firestoreServices';

const useFirestoreDoc = ({ query, data, deps, shouldExecute = true }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if(!shouldExecute) {
      // Set loading to false in redux 
      dispatch(asyncActionFinish());
      
      return;
    }

    // Set loading to true in redux 
    dispatch(asyncActionStart());

    const unSubscribe = query().onSnapshot(snapshot => { // A query that returns a single doc snapshot
      // If snapshot does not exist, dispatch error and return from hook
      if(!snapshot.exists) {
        dispatch(asyncActionError({ code: 'not-found', message: 'Could not find document'}));
        return;
      }

      const doc = transformSnapshot(snapshot);
      data(doc);

      // Set loading to false in redux 
      dispatch(asyncActionFinish());
    }, error => dispatch(asyncActionError()));
    
    return () => {
      unSubscribe();
    }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}

export default useFirestoreDoc;
