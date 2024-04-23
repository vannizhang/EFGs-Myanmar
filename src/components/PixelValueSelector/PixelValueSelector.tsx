import {
    RASTER_ATTRIBUTE_TABLE,
    UNIQUE_VALUE_INFO,
} from '@services/Myanmar-EFG/config';
import { getAttributesByEFGName } from '@services/Myanmar-EFG/getArrtibuteByPixelValue';
import { myanmarEFGLayerSelectedPixelsValueChanged } from '@store/Map/reducer';
import { selectMyanmarEFGLayerSelectedPixelValues } from '@store/Map/selectors';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const PixelValueSelector = () => {
    const dispatch = useDispatch();

    const [nameOfSelectedEFG, setNameOfSelectedEFG] = useState<string>('');

    const selectPixelsByEFGName = useCallback(
        (name: string) => {
            const shouldDeselect = name === nameOfSelectedEFG;
            // console.log(shouldDeselect, nameOfSelectedEFG)

            setNameOfSelectedEFG(shouldDeselect ? '' : name);

            if (shouldDeselect) {
                return dispatch(
                    myanmarEFGLayerSelectedPixelsValueChanged(null)
                );
            }

            const features = getAttributesByEFGName(name);

            let pixelValues = features.map((d) => d.attributes.Value);
            // console.log(pixelValues)

            // Use hard coded pixel values for these two EFG value.
            // for some reason we encounter "RangeError: offset is out of bounds" error when use the `pixelValues`
            // returned above.
            if (name === 'Tie with 3 Sources') {
                pixelValues = [28, 29, 32];
            } else if (name === 'Boulder and cobble shores') {
                pixelValues = [30, 45];
            }

            dispatch(myanmarEFGLayerSelectedPixelsValueChanged(pixelValues));
        },
        [nameOfSelectedEFG]
    );

    return (
        <div className="mt-8">
            <div className="mb-2 text-center">
                <h3 className="mb-1">Myanmar EFG Preliminary Combinations</h3>
                <p className="text-xs opacity-50">Click to toggle visibility</p>
            </div>
            <div className="grid grid-cols-2">
                {UNIQUE_VALUE_INFO.map((d) => {
                    const { label, symbol, value } = d;

                    const { color } = symbol;

                    return (
                        <div
                            key={label}
                            className="text-xs cursor-pointer my-1 pl-2 flex items-center border-l-4"
                            style={{
                                borderColor: `rgba(${color.join(',')})`,
                                opacity:
                                    nameOfSelectedEFG &&
                                    nameOfSelectedEFG !== value
                                        ? 0.25
                                        : 1,
                            }}
                            onClick={selectPixelsByEFGName.bind(null, value)}
                        >
                            <div>{label}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
