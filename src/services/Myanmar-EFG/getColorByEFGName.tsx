import { UNIQUE_VALUE_INFO } from './config';

const fillColorMap: Map<string, number[]> = UNIQUE_VALUE_INFO.reduce(
    (map, curr) => {
        const { value, symbol } = curr;
        map.set(value, symbol.color);
        return map;
    },
    new Map()
);

export const getFillColorByEFGName = (EFGName: string) => {
    return fillColorMap.get(EFGName);
};
