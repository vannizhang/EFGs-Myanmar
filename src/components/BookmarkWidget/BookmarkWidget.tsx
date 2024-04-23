import React from 'react';

import MapView from '@arcgis/core/views/MapView';
import Bookmarks from '@arcgis/core/widgets/Bookmarks';
import Expand from '@arcgis/core/widgets/Expand';
// import { SiteContext } from '../../contexts/SiteContextProvider';

interface Props {
    mapView?: MapView;
}

const BookmarksWidget: React.FC<Props> = ({ mapView }) => {
    // const { isMobile } = React.useContext(SiteContext)

    // const [ legend, setLegend ] = React.useState<ILegend>();

    const init = () => {
        // console.log('init legend');
        const bookmarks = new Bookmarks({
            view: mapView,
        });

        const bookmarksWidgetExpand = new Expand({
            view: mapView,
            content: bookmarks,
            // expandIconClass: 'esri-icon-bookmarks',
            expanded: false,
            mode: 'floating',
        });

        mapView.ui.add(bookmarksWidgetExpand, 'top-left');
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

export default BookmarksWidget;
