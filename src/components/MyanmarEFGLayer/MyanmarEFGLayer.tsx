import MapView from '@arcgis/core/views/MapView';
import ImageryTileLayer from '@arcgis/core/layers/ImageryTileLayer';
import ImageHistogramParameters from '@arcgis/core/rest/support/ImageHistogramParameters';
import React, { FC, useEffect } from 'react';
import { watch } from '@arcgis/core/core/reactiveUtils';
import { TITLE_OF_MYANMAR_EPG_LAYER } from '@constants/index';
import { Point } from '@arcgis/core/geometry';
import { ImageryTileLayerIdentifyResult } from '@store/Map/reducer';

type Props = {
    identifyResponseHandler: (data: ImageryTileLayerIdentifyResult) => void;
    mapView?: MapView;
};

export const MyanmarEFGLayerQueryTask: FC<Props> = ({
    identifyResponseHandler,
    mapView,
}) => {
    const init = () => {
        const layer = mapView.map.layers.find(
            (layer) => layer.title === TITLE_OF_MYANMAR_EPG_LAYER
        ) as ImageryTileLayer;
        // console.log('Myanmar EFG Layer', layer)

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

        // watch(
        //     // getValue function
        //     () => mapView.stationary,
        //     // callback
        //     async(stationary) => {
        //         if (!stationary) {
        //             return;
        //         }

        //         if(mapView.zoom < 10){
        //             return
        //         }

        //         const pixelSize = {
        //             x:mapView.resolution,
        //             y:mapView.resolution,
        //             spatialReference: {
        //                 wkid: 4326,
        //                 latestWkid: 4326
        //             }
        //         }
        //           // set the histogram parameters to request
        //           // data for the current view extent and resolution
        //           const params = new ImageHistogramParameters({
        //                 geometry:  mapView.extent,
        //                 pixelSize: pixelSize
        //           });

        //         const res = await layer.computeStatisticsHistograms(params)
        //         console.log(res)
        //     }
        // );

        // mapView.map.add(layer)
    };

    useEffect(() => {
        if (mapView) {
            init();
        }
    }, [mapView]);
    return null;
};
