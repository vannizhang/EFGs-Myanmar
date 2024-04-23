import ImageryTileLayer from '@arcgis/core/layers/ImageryTileLayer';
import MapView from '@arcgis/core/views/MapView';
import { TITLE_OF_MYANMAR_EPG_LAYER } from '@constants/index';
import React, { FC } from 'react';

type Props = {
    mapView?: MapView;
};

export const useMyanmarEFGLayer = ({ mapView }: Props) => {
    const layer = mapView.map.layers.find(
        (layer) => layer.title === TITLE_OF_MYANMAR_EPG_LAYER
    ) as ImageryTileLayer;

    return layer;
};
