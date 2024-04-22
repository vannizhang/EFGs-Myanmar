import { Point } from '@arcgis/core/geometry';
import { Myanmar_EFG_Feature_Attributes } from '@services/Myanmar-EFG/config';
import React, { FC } from 'react';

type Props = {
    queryLocation: Point;
    featureAttributes: Myanmar_EFG_Feature_Attributes;
};

export const InfoPanel: FC<Props> = ({ featureAttributes, queryLocation }) => {
    const getContent = () => {
        if (!featureAttributes) {
            return (
                <div className="w-full opacity-50 text-center">
                    <p>Click on map to get EFG related info </p>
                </div>
            );
        }

        return <div className="">{featureAttributes.EFG_Name}</div>;
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
