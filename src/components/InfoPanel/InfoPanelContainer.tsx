import { Myanmar_EFG_Feature_Attributes } from '@services/Myanmar-EFG/config';
import { getArrtibutesByPixelValue } from '@services/Myanmar-EFG/getArrtibuteByPixelValue';
import { selectMyanmarEFGLayerIdentifyResult } from '@store/Map/selectors';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { InfoPanel } from './InfoPanel';
import { useDispatch } from 'react-redux';
import { myanmarEFGLayerIdentifyResultChanged } from '@store/Map/reducer';

export const InfoPanelContainer = () => {
    const dispatch = useDispatch();

    const myanmarEFGLayerIdentifyResult = useSelector(
        selectMyanmarEFGLayerIdentifyResult
    );

    const [featureAttributes, setFeatureAttributes] =
        useState<Myanmar_EFG_Feature_Attributes>();

    useEffect(() => {
        if (
            !myanmarEFGLayerIdentifyResult ||
            !myanmarEFGLayerIdentifyResult.pixelValue
        ) {
            setFeatureAttributes(undefined);
            return;
        }

        const featureAttributes =
            myanmarEFGLayerIdentifyResult &&
            myanmarEFGLayerIdentifyResult.pixelValue
                ? getArrtibutesByPixelValue(
                      myanmarEFGLayerIdentifyResult.pixelValue
                  )
                : undefined;

        setFeatureAttributes(featureAttributes);
    }, [myanmarEFGLayerIdentifyResult]);

    return (
        <InfoPanel
            featureAttributes={featureAttributes}
            queryLocation={myanmarEFGLayerIdentifyResult?.point}
            closeButtonOnClick={() => {
                dispatch(myanmarEFGLayerIdentifyResultChanged(undefined));
            }}
        />
    );
};
