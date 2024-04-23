import MapView from '@arcgis/core/views/MapView';
import React, { FC, useEffect } from 'react';
import { useMyanmarEFGLayer } from './useMyanmarEFGLayer';

import { mask } from '@arcgis/core/layers/support/rasterFunctionUtils.js';
import { useSelector } from 'react-redux';
import { selectMyanmarEFGLayerSelectedPixelValues } from '@store/Map/selectors';

type Props = {
    mapView?: MapView;
};

export const MyanmarEFGLayerFilter: FC<Props> = ({ mapView }) => {
    const layer = useMyanmarEFGLayer({ mapView });

    const selectedPixelValues = useSelector(
        selectMyanmarEFGLayerSelectedPixelValues
    );

    useEffect(() => {
        console.log(selectedPixelValues);

        if (!selectedPixelValues) {
            layer.rasterFunction = undefined;
            return;
        }

        const includedRanges: number[][] = [];

        for (const val of selectedPixelValues) {
            includedRanges.push([val, val]);
        }

        const rasterFunction = mask({
            includedRanges, //[[4, 4]],
            noDataValues: [],
        });

        layer.rasterFunction = rasterFunction;
    }, [layer, selectedPixelValues]);

    return null;
};
