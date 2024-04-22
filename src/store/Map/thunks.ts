import { Point } from '@arcgis/core/geometry';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import { isQueryingToggled } from './reducer';

let abortController: AbortController = null;

export const queryEcosystemData =
    (point: Point) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        try {
            if (abortController) {
                abortController.abort();
            }

            abortController = new AbortController();

            dispatch(isQueryingToggled(true));

            // do some async work (e.g. check if the new webmap id is an valid ArcGIS Online Item)
            // ...

            // now everything is ready and we can dispatch the new webmap Id to the reducer to trigger the state change

            dispatch(isQueryingToggled(false));
        } catch (err) {
            console.error(err);
        }
    };
