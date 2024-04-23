import {
    RASTER_ATTRIBUTE_TABLE,
    Myanmar_EFG_Feature_Attributes,
} from './config';

const featureByPxielValue: Map<number, Myanmar_EFG_Feature_Attributes> =
    new Map();

export const getArrtibutesByPixelValue = (
    pixel: number
): Myanmar_EFG_Feature_Attributes => {
    if (featureByPxielValue.has(pixel)) {
        return featureByPxielValue.get(pixel);
    }

    const feature = RASTER_ATTRIBUTE_TABLE.features.find(
        (feature) => feature.attributes.Value === pixel
    );

    featureByPxielValue.set(pixel, feature.attributes);

    return featureByPxielValue.get(pixel);
};

export const getAttributesByEFGName = (name: string) => {
    return RASTER_ATTRIBUTE_TABLE.features.filter((feature) => {
        return feature.attributes.EFG_Name === name;
    });
};
