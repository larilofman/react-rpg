import { useDispatch } from 'react-redux';
import { IncrementCreatureIndex } from '../../components/redux-state/reducers/turn/actions';

export default function useUseTurn() {
    const dispatch = useDispatch();
    // Called by a creature to increase the index keeping track which creature's turn inside the faction it is
    const useTurn = () => {
        dispatch(IncrementCreatureIndex());
    };

    return { useTurn };
}
