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

import Graphic from '@arcgis/core/Graphic';
import { Point } from '@arcgis/core/geometry';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import MapView from '@arcgis/core/views/MapView';
import React, { FC, useEffect, useRef } from 'react';
import IconImage from './map-anchor.png';
import { useSelector } from 'react-redux';
import { selectMyanmarEFGLayerIdentifyResult } from '@store/Map/selectors';

type Props = {
    mapView?: MapView;
};

export const IdentifyTaskLocation: FC<Props> = ({ mapView }) => {
    const graphicLayerRef = useRef<GraphicsLayer>();

    const myanmarEFGLayerIdentifyResult = useSelector(
        selectMyanmarEFGLayerIdentifyResult
    );

    const showAnchorPoint = async () => {
        try {
            graphicLayerRef.current = new GraphicsLayer({
                title: 'Identify Task Location',
            });

            const graphic = new Graphic({
                geometry: {
                    type: 'point',
                    ...myanmarEFGLayerIdentifyResult?.point,
                },
                symbol: {
                    type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
                    url: IconImage,
                    width: 36,
                    height: 36,
                } as any,
            });

            graphicLayerRef.current.add(graphic);

            mapView.map.add(graphicLayerRef.current);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        (async () => {
            if (!mapView) {
                return;
            }

            if (!myanmarEFGLayerIdentifyResult?.point) {
                mapView.map.remove(graphicLayerRef.current);
            } else {
                showAnchorPoint();
            }
        })();
    }, [myanmarEFGLayerIdentifyResult, mapView]);

    return null;
};
