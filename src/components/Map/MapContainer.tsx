/* Copyright 2024 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import classNames from 'classnames';
import React, { FC, useEffect, useMemo, useState } from 'react';
import MapView from './MapView';
// import { WEB_MAP_ID } from '../../constants/map';
// import { useSelector } from 'react-redux';
import EventHandlers from './EventHandlers';
import { useDispatch } from 'react-redux';
import { batch } from 'react-redux';
// import { saveMapCenterToHashParams } from '../../utils/url-hash-params';
import { MapLoadingIndicator } from './MapLoadingIndicator';
import { Point } from '@arcgis/core/geometry';
// import { MapCenterIndicator } from './MapCenterIndicator';
import { WEB_MAP_ID } from '@constants/index';
import LegendWidget from '@components/LegendWidget/LegendWidget';
import { MyanmarEFGLayerQueryTask } from '@components/MyanmarEFGLayer/MyanmarEFGLayerQueryTask';
import {
    myanmarEFGLayerHistogramResultChanged,
    myanmarEFGLayerIdentifyResultChanged,
} from '@store/Map/reducer';
import { IdentifyTaskLocation } from '@components/IdentifyTaskLocation/IdentifyTaskLocation';
import BookmarksWidget from '@components/BookmarkWidget/BookmarkWidget';
import LayerListWidget from '@components/LayersList/LayersList';
import Sentinel2Layer from '@components/Sentinel2Layer/Sentinel2Layer';

export const MapViewContainer = () => {
    const dispatch = useDispatch();

    const [isUpdating, setIsUpdating] = useState<boolean>(true);

    // useEffect(() => {
    //     // console.log('map view zoom and center has changed', center, zoom);
    //     saveMapCenterToHashParams(center, zoom);
    // }, [zoom, center]);

    return (
        <div
            className={classNames(
                'absolute top-0 right-0 bottom-0 left-side-panel-width '
            )}
        >
            <MapView webmapId={WEB_MAP_ID}>
                <EventHandlers
                    // onStationary={(center, zoom, extent) => {
                    //     // console.log(
                    //     //     'map view is stationary',
                    //     //     center,
                    //     //     zoom,
                    //     //     extent
                    //     // );
                    // }}
                    // onClickHandler={(point) => {
                    //     // console.log('clicked on map', point);
                    //     // const { latitude, longitude } = point;

                    //     // const queryLocation = {
                    //     //     x: +longitude,
                    //     //     y: +latitude,
                    //     //     longitude,
                    //     //     latitude,
                    //     //     spatialReference: {
                    //     //         wkid: 4326,
                    //     //     },
                    //     // } as Point;

                    //     // if (mapOnClick) {
                    //     //     mapOnClick(queryLocation);
                    //     // }

                    //     // console.log(queryLocation);
                    // }}
                    mapViewUpdatingOnChange={setIsUpdating}
                />

                <LayerListWidget />

                <BookmarksWidget />

                <LegendWidget />

                <IdentifyTaskLocation />

                <Sentinel2Layer />

                <MyanmarEFGLayerQueryTask
                    identifyResponseHandler={(res) => {
                        // console.log(res)
                        dispatch(myanmarEFGLayerIdentifyResultChanged(res));
                    }}
                    computeHistogramResponseHandler={(res) => {
                        // console.log(res)
                        dispatch(myanmarEFGLayerHistogramResultChanged(res));
                    }}
                />
            </MapView>

            <MapLoadingIndicator active={isUpdating} />
        </div>
    );
};
