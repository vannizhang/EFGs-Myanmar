import { OVERLAP_COMBINATION } from './config';

const map: Map<number, string> = OVERLAP_COMBINATION.reduce((map, curr) => {
    return map.set(curr.Value, curr['Overlap Combinations']);
}, new Map());

export const getOverlapCombinationByPixelValue = (pixel: number): string => {
    return map.get(pixel);
};
