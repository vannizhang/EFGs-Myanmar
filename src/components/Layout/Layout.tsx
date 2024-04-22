import { BottomPanel } from '@components/BottomPanel/BottomPanel';
import { ErrorBoundary } from '@components/ErrorBoundary';
import { Map } from '@components/Map/';
import { SidePanel } from '@components/SidePanel/SidePanel';
import React from 'react';

export const Layout = () => {
    return (
        <ErrorBoundary>
            <SidePanel></SidePanel>
            <Map />
        </ErrorBoundary>
    );
};
