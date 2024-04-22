import { selectMyanmarEFGLayerIdentifyResult } from '@store/Map/selectors';
import React from 'react';
import { useSelector } from 'react-redux';

export const InfoPanelContainer = () => {
    const myanmarEFGLayerIdentifyResult = useSelector(
        selectMyanmarEFGLayerIdentifyResult
    );

    const getContent = () => {
        if (!myanmarEFGLayerIdentifyResult) {
            return (
                <div className="w-full opacity-50 text-center">
                    <p>Click on map to get EFG related info </p>
                </div>
            );
        }

        return (
            <div className="">{myanmarEFGLayerIdentifyResult.pixelValue}</div>
        );
    };

    return (
        <div className="text-sm my-4">
            <div className="text-center mb-2">
                <h3 className="text-lg">EFG Information</h3>
            </div>
            {getContent()}
        </div>
    );
};
