import { selectMyanmarEFGLayerHistogramResult } from '@store/Map/selectors';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const HistogramContainer = () => {
    const rawData = useSelector(selectMyanmarEFGLayerHistogramResult);

    useEffect(() => {
        // console.log(rawData)
    }, [rawData]);

    return <div>HistogramContainer</div>;
};
