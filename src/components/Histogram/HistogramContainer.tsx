import { getArrtibutesByPixelValue } from '@services/Myanmar-EFG/getArrtibuteByPixelValue';
import { getFillColorByEFGName } from '@services/Myanmar-EFG/getColorByEFGName';
import { selectMyanmarEFGLayerHistogramResult } from '@store/Map/selectors';
import { HorizontalBarChart } from '@vannizhang/react-d3-charts';
import { HorizontalBarChartDataItem } from '@vannizhang/react-d3-charts/dist/HorizontalBarChart/types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Histogram } from './Histogram';

export const HistogramContainer = () => {
    const histogramRes = useSelector(selectMyanmarEFGLayerHistogramResult);

    const [chartData, setChartData] = useState<HorizontalBarChartDataItem[]>();

    useEffect(() => {
        // console.log(rawData)

        if (!histogramRes) {
            setChartData(undefined);
            return;
        }

        const data: HorizontalBarChartDataItem[] = [];

        const entries = Object.entries(histogramRes).map((d) => [+d[0], d[1]]);

        // get total count of pixels that have value greater than 1 (1 indicate no value assigned)
        const countOfPixels = entries.reduce((accu, curr) => {
            // return curr[0] !== 1 ? accu + curr[1] : accu;
            return accu + curr[1];
        }, 0);

        for (const [key, val] of entries) {
            const attributes = getArrtibutesByPixelValue(key);

            if (key === 1) {
                continue;
            }

            const pctOfPxiels = Math.round((val / countOfPixels) * 100);

            const EFGName = attributes.EFG_Name;

            const y =
                EFGName.length > 45 ? EFGName.slice(0, 45) + '...' : EFGName;

            const fillColor = getFillColorByEFGName(EFGName);

            data.push({
                x: pctOfPxiels,
                y,
                fill: `rgba(${fillColor.join(',')})`,
                // tooltip: `${pctOfPxiels}%`,
            });
        }

        data.sort((a, b) => b.x - a.x);

        setChartData(data);
    }, [histogramRes]);

    return (
        <div className="w-full mt-8">
            <div className="mb-1 text-center">
                <h3 className="text-lg">Histogram</h3>
            </div>
            <p className="text-xs mb-4 opacity-50">
                Percentage of areas in current map extent by EFG Preliminary
                Combinations{' '}
            </p>
            <Histogram chartData={chartData} />
        </div>
    );
};
