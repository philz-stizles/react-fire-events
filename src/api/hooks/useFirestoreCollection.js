import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { asyncActionError, asyncActionFinish, asyncActionStart } from '../../redux/actions/asyncActions';
import { transformSnapshot } from '../firestoreServices';

const useFirestoreCollection = ({ query, data, deps }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Set loading to true in redux 
    dispatch(asyncActionStart());

    const unSubscribe = query().onSnapshot(snapshot => {
      const docs = snapshot.docs.map(doc => transformSnapshot(doc));
      data(docs);

      // Set loading to false in redux 
      dispatch(asyncActionFinish());
    }, error => dispatch(asyncActionError()));
    
    return () => {
      unSubscribe();
    }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}

export default useFirestoreCollection;
