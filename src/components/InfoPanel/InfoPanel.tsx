import { Point } from '@arcgis/core/geometry';
import { Myanmar_EFG_Feature_Attributes } from '@services/Myanmar-EFG/config';
import { getFillColorByEFGName } from '@services/Myanmar-EFG/getColorByEFGName';
import { getOverlapCombinationByPixelValue } from '@services/Myanmar-EFG/getOverlapCombinationByPixelValue';
import classNames from 'classnames';
import React, { FC } from 'react';

type Props = {
    queryLocation: Point;
    featureAttributes: Myanmar_EFG_Feature_Attributes;
    closeButtonOnClick: () => void;
};

type TableData = {
    name: string;
    value: string;
};

export const InfoPanel: FC<Props> = ({
    featureAttributes,
    queryLocation,
    closeButtonOnClick,
}) => {
    const getContent = () => {
        if (!featureAttributes || !queryLocation) {
            return (
                <div className="w-full opacity-50 text-center text-xs">
                    <p>Click on map to identify EFG related info </p>
                </div>
            );
        }

        const overlapCombination = getOverlapCombinationByPixelValue(
            featureAttributes.Value
        );

        const pixelFillColor = getFillColorByEFGName(
            featureAttributes.EFG_Name
        );

        const tableData: TableData[] = [
            { name: 'EFG Name', value: featureAttributes.EFG_Name },
            { name: 'Biome Name', value: featureAttributes.Biome_Name },
            { name: 'Realm Name', value: featureAttributes.Realm_Name },
        ];

        if (overlapCombination) {
            tableData.push({
                name: 'Overlap Combination',
                value: overlapCombination,
            });
        }

        return (
            <div className="text-sm mb-4">
                <div className="flex mb-2">
                    <div className="pl-1 text-xs flex-grow flex items-center">
                        <calcite-icon icon="pin" scale="s" />
                        <span>
                            lon: {queryLocation.longitude.toFixed(3)} lat:{' '}
                            {queryLocation.latitude.toFixed(3)}
                        </span>
                    </div>

                    <div
                        className=" cursor-pointer"
                        onClick={closeButtonOnClick}
                    >
                        <calcite-icon icon="x" scale="m" />
                    </div>
                </div>

                {tableData.map((d, index) => {
                    return (
                        <div
                            key={Math.random()}
                            className={classNames(
                                'flex items-center my-1 py-2 pl-2 border-l-4',
                                {
                                    'bg-custom-background-1 bg-opacity-25':
                                        index % 2 === 0,
                                }
                            )}
                            style={{
                                borderColor: `rgba(${pixelFillColor.join(
                                    ','
                                )})`,
                            }}
                        >
                            <div className="flex-grow px-1">{d.value}</div>
                            <div className="w-24 shrink-0 px-1 text-right opacity-60">
                                {d.name}
                            </div>
                        </div>
                    );
                })}

                {/* <div className="flex items-center py-2">
                    <div className=" flex-grow px-1">
                        {featureAttributes.Biome_Name}
                    </div>
                    <div className=" w-24 shrink-0 px-1 text-right opacity-60">
                        Biome Name
                    </div>
                </div>

                <div className="flex items-center py-2 bg-custom-background-1 bg-opacity-25">
                    <div className=" flex-grow px-1">
                        {featureAttributes.Realm_Name}
                    </div>
                    <div className=" w-24 shrink-0 px-1 text-right opacity-60">
                        Realm Name
                    </div>
                </div> */}

                <div className=" mt-4 ">
                    <calcite-button
                        icon-start="link"
                        appearance="outline"
                        width="full"
                        href={featureAttributes.GET_DscURL}
                    >
                        Check Detailed Description
                    </calcite-button>
                    {/* <span className='ml-2'>Learn more from Global Ecosystem Topology Website</span> */}
                </div>
            </div>
        );
    };

    return (
        <div className=" my-4">
            <div className="text-center mb-2">
                <h3 className="text-lg">EFG Information</h3>
            </div>
            {getContent()}
        </div>
    );
};
