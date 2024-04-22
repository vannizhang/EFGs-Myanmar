import React from 'react';

import MapView from '@arcgis/core/views/MapView';
import Legend from '@arcgis/core/widgets/Legend';
import Expand from '@arcgis/core/widgets/Expand';
// import { SiteContext } from '../../contexts/SiteContextProvider';

interface Props {
    mapView?: MapView;
}

const LegendWidget: React.FC<Props> = ({ mapView }) => {
    // const { isMobile } = React.useContext(SiteContext)

    // const [ legend, setLegend ] = React.useState<ILegend>();

    const init = async () => {
        // console.log('init legend');
        const legend = new Legend({
            view: mapView,
        });

        const legendWidgetExpand = new Expand({
            view: mapView,
            content: legend,
            expandIconClass: 'esri-icon-legend',
            expanded: false,
            mode: 'floating',
        });

        mapView.ui.add(legendWidgetExpand, 'top-left');
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

export default LegendWidget;
