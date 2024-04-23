import { showAboutModalToggled } from '@store/UI/reducer';
import React from 'react';
import { useDispatch } from 'react-redux';

export const Header = () => {
    const dispatch = useDispatch();

    return (
        <div className="w-full text-center pb-2 mb-4 border-b border-custom-background-1">
            <h2 className="text-xl flex items-center">
                <span className="mr-2">
                    Ecological Functional Groups of Myanmar
                </span>
                <calcite-button
                    appearance="transparent"
                    icon-start="information"
                    kind="neutral"
                    scale="s"
                    onClick={() => {
                        dispatch(showAboutModalToggled(true));
                    }}
                />
            </h2>
        </div>
    );
};
