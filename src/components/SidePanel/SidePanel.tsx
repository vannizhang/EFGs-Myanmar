import { Header } from '@components/Header/Header';
import { Histogram } from '@components/Histogram';
import { InfoPanel } from '@components/InfoPanel';
import React from 'react';

export const SidePanel = () => {
    return (
        <div className="absolute top-0 left-0 bottom-0 w-side-panel-width p-4 overflow-y-auto fancy-scrollbar">
            <Header />
            <InfoPanel />
            <Histogram />
        </div>
    );
};
