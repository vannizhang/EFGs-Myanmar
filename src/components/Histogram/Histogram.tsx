import { HorizontalBarChart } from '@vannizhang/react-d3-charts';
import { HorizontalBarChartDataItem } from '@vannizhang/react-d3-charts/dist/HorizontalBarChart/types';
import React, { FC } from 'react';

type Props = {
    chartData: HorizontalBarChartDataItem[];
};

export const Histogram: FC<Props> = ({ chartData }) => {
    if (!chartData || !chartData.length) {
        return null;
    }

    return (
        <div
            className="relative w-full h-[500px]"
            style={
                {
                    '--axis-tick-line-color': 'var(--calcite-color-text-3)',
                    '--axis-tick-text-color': 'var(--calcite-color-text-2)',
                    '--axis-tick-text-font-size': '11px',
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
                    left: 250,
                    right: 15,
                    top: 5,
                    bottom: 30,
                }}
            />
        </div>
    );
};
