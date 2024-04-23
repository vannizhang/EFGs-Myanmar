import { getArrtibutesByPixelValue } from '@services/Myanmar-EFG/getArrtibuteByPixelValue';
import { getFillColorByEFGName } from '@services/Myanmar-EFG/getColorByEFGName';
import { selectMyanmarEFGLayerHistogramResult } from '@store/Map/selectors';
import { HorizontalBarChart } from '@vannizhang/react-d3-charts';
import { HorizontalBarChartDataItem } from '@vannizhang/react-d3-charts/dist/HorizontalBarChart/types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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
            return curr[0] !== 1 ? accu + curr[1] : accu;
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

    if (!chartData || !chartData.length) {
        return null;
    }

    return (
        <div
            className="relative w-full h-[400px]"
            style={
                {
                    '--axis-tick-line-color': 'var(--calcite-color-text-3)',
                    '--axis-tick-text-color': 'var(--calcite-color-text-2)',
                    '--axis-tick-text-font-size': '10px',
                } as React.CSSProperties
            }
        >
            <HorizontalBarChart
                // xScaleOptions={{
                //     domain: [
                //         0,
                //         100
                //     ]
                // }}
                bottomAxisOptions={{
                    // indicate number of ticks on bottom axis that should be rendered
                    numberOfTicks: 3,
                    // extend ticks on y axis and show them as grid lines
                    showGridLines: true,
                    // custom format function that add '$' to tick label text
                    tickFormatFunction: (val: string | number) => {
                        return `${val}%`;
                    },
                }}
                data={chartData}
                margin={{
                    left: 230,
                    right: 15,
                    top: 30,
                    bottom: 30,
                }}
            />
        </div>
    );
};
