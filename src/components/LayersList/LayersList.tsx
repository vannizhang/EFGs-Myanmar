import React from 'react';

import MapView from '@arcgis/core/views/MapView';
import LayerList from '@arcgis/core/widgets/LayerList';
import Expand from '@arcgis/core/widgets/Expand';
// import { SiteContext } from '../../contexts/SiteContextProvider';

interface Props {
    mapView?: MapView;
}

const LayerListWidget: React.FC<Props> = ({ mapView }) => {
    const init = () => {
        // console.log('init legend');
        const layerList = new LayerList({
            view: mapView,
        });

        const layerListWidgetExpand = new Expand({
            view: mapView,
            content: layerList,
            // expandIconClass: 'esri-icon-legend',
            expanded: false,
            mode: 'floating',
        });

        mapView.ui.add(layerListWidgetExpand, 'top-left');
    };

    React.useEffect(() => {
        // console.log(mapView);

        if (!mapView) {
            return;
        }

        init();
    }, [mapView]);

    return null;
};

export default LayerListWidget;
