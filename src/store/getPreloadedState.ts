import { initialUIState } from './UI/reducer';
import { PartialRootState } from './configureStore';

const getPreloadedState = (): PartialRootState => {
    return {
        UI: {
            ...initialUIState,
        },
    };
};

export default getPreloadedState;
