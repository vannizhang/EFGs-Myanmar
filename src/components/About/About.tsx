import { selectShowAboutModal } from '@store/UI/selectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { CloseButton } from './CloseButton';
import { useDispatch } from 'react-redux';
import { showAboutModalToggled } from '@store/UI/reducer';

export const About = () => {
    const dispatch = useDispatch();

    const shouldShow = useSelector(selectShowAboutModal);

    if (!shouldShow) {
        return null;
    }

    return (
        <div className="absolute top-0 left-0 bottom-0 right-0 px-4 py-10 bg-black bg-opacity-90 z-20 overflow-y-auto fancy-scrollbar">
            <CloseButton
                onClick={() => {
                    dispatch(showAboutModalToggled(false));
                }}
            />

            <div
                className="flex justify-center mt-4 mx-auto"
                style={{
                    maxWidth: '90vw',
                }}
            >
                <div
                    className="py-10"
                    style={{
                        maxWidth: 1680,
                    }}
                >
                    <h1 className="text-xl mb-4">
                        About Ecological Functional Groups of Myanmar
                    </h1>
                    <hr className="mb-4 opacity-25" />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Nesciunt corporis quod neque cumque fugit mollitia eum
                    libero? Laborum hic fuga animi delectus temporibus veniam
                    dolores, libero blanditiis repellat minima ratione.
                </div>
            </div>
        </div>
    );
};
