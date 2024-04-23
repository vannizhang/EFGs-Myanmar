import MapView from '@arcgis/core/views/MapView';
// import ImageryTileLayer from '@arcgis/core/layers/ImageryTileLayer';
// import ImageHistogramParameters from '@arcgis/core/rest/support/ImageHistogramParameters';
import React, { FC, useEffect, useRef } from 'react';
import { watch } from '@arcgis/core/core/reactiveUtils';
// import { TITLE_OF_MYANMAR_EPG_LAYER } from '@constants/index';
import { Point } from '@arcgis/core/geometry';
import {
    ImageryTileLayerIdentifyResult,
    PixelsHistogram,
} from '@store/Map/reducer';
import { useMyanmarEFGLayer } from './useMyanmarEFGLayer';

type Props = {
    identifyResponseHandler: (data: ImageryTileLayerIdentifyResult) => void;
    computeHistogramResponseHandler: (data: PixelsHistogram) => void;
    mapView?: MapView;
};

export const MyanmarEFGLayerQueryTask: FC<Props> = ({
    identifyResponseHandler,
    computeHistogramResponseHandler,
    mapView,
}) => {
    const layer = useMyanmarEFGLayer({ mapView });

    const getHistogram = async () => {
        if (!layer) {
            return;
        }

        try {
            const res = await layer.fetchPixels(
                mapView.extent,
                mapView.width,
                mapView.height
            );
            // console.log(res)

            const { pixelBlock } = res;
            const { pixels, height, width } = pixelBlock;

            const band1 = pixels[0];
            // console.log(band1, pixels.length, band1.length, height*width)

            const histogram: PixelsHistogram = {};

            for (const pixel of band1) {
                if (pixel === 0) {
                    continue;
                }

                if (histogram[pixel] == undefined) {
                    histogram[pixel] = 0;
                }

                histogram[pixel]++;
            }

            // console.log(histogram)

            computeHistogramResponseHandler(histogram);
        } catch (err) {
            console.error(err);
        }
    };

    const addClickEventHandler = () => {
        mapView.on('click', async (evt) => {
            const point = evt.mapPoint;
            // console.log(evt.mapPoint)
            const res = await layer.identify(point);
            // console.log(res)

            identifyResponseHandler({
                point: {
                    longitude: point.longitude,
                    latitude: point.latitude,
                    x: point.longitude,
                    y: point.latitude,
                    spatialReference: {
                        wkid: 4326,
                    },
                } as Point,
                pixelValue: res.value ? res.value[0] : undefined,
            });
        });
    };

    const addStationaryEventHandler = () => {
        watch(
            // getValue function
            () => mapView.stationary,
            // callback
            async (stationary) => {
                if (!stationary) {
                    return;
                }

                getHistogram();
            }
        );

        getHistogram();
    };

    const init = async () => {
        // layerRef.current = mapView.map.layers.find(
        //     (layer) => layer.title === TITLE_OF_MYANMAR_EPG_LAYER
        // ) as ImageryTileLayer;
        // console.log('Myanmar EFG Layer', layer)

        await layer.when();

        addClickEventHandler();

        addStationaryEventHandler();

        // mapView.map.add(layer)
    };

    useEffect(() => {
        if (!mapView || !layer) {
            return;
        }

        init();
    }, [mapView, layer]);

    return null;
};
