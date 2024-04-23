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

import React, { useEffect, useRef, useState } from 'react';
import ImageryLayer from '@arcgis/core/layers/ImageryLayer';
// import IMapView from '@arcgis/core/views/MapView';
import { addMonths, format } from 'date-fns';
import {
    SENTINEL_2_IMAGE_SERVICE_FIELD_NAMES,
    SENTINEL_2_IMAGE_SERVICE_URL,
} from './config';

type UseLandCoverLayerParams = {
    year: number;
    aquisitionMonth: number;
    visible?: boolean;
    // mapView?: IMapView;
};

const { AcquisitionDate, CloudCover } = SENTINEL_2_IMAGE_SERVICE_FIELD_NAMES;

export const getMosaicRuleByAcquisitionDate = (
    year: number,
    month: number
    // day = 15
) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = addMonths(startDate, 1);

    return {
        mosaicMethod: 'esriMosaicAttribute',
        // only get sentinel-2 imagery from the input month
        where: `${AcquisitionDate} BETWEEN timestamp '${format(
            startDate,
            'yyyy-MM-dd'
        )} 06:00:00' AND timestamp '${format(endDate, 'yyyy-MM-dd')} 05:59:59'`,
        // sort by cloud cover to get imagery with least cloud coverage
        sortField: CloudCover,
        sortValue: 0,
        ascending: true,
        mosaicOperation: 'MT_FIRST',
    };
};

export const createMosaicRuleByYear = (year: number, month: number) => {
    // const monthStr = month < 10 ? '0' + month : month.toString();

    const { where, sortField, sortValue, ascending } =
        getMosaicRuleByAcquisitionDate(year, month);

    return {
        method: `attribute`,
        where,
        sortField,
        sortValue,
        ascending,
    };
};

const useSentinel2Layer = ({
    year,
    aquisitionMonth,
    visible = true,
}: UseLandCoverLayerParams) => {
    const layerRef = useRef<ImageryLayer>();

    const [sentinel2Layer, setSentinel2Layer] = useState<ImageryLayer>();

    /**
     * get sentinel 2 layer using mosaic created using the input year
     */
    const getSentinel2Layer = async () => {
        layerRef.current = new ImageryLayer({
            // URL to the imagery service
            url: SENTINEL_2_IMAGE_SERVICE_URL,
            mosaicRule: createMosaicRuleByYear(year, aquisitionMonth) as any,
            // rasterFunction: {
            //     functionName: selectedRasterFunction,
            // },
            visible,
            // blendMode: 'multiply'
            title: 'Sentinel-2',
        });

        setSentinel2Layer(layerRef.current);
    };

    useEffect(() => {
        if (!layerRef.current) {
            getSentinel2Layer();
        } else {
            layerRef.current.mosaicRule = createMosaicRuleByYear(
                year,
                aquisitionMonth
            ) as any;
        }
    }, [year, aquisitionMonth]);

    useEffect(() => {
        if (!layerRef.current) {
            return;
        }

        layerRef.current.visible = visible;
    }, [visible]);

    return sentinel2Layer;
};

export default useSentinel2Layer;
