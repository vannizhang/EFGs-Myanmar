/* Copyright 2024 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { signOut } from '@utils/esri-oauth';
import React, { FC } from 'react';

type Props = {
    error?: Error;
};

export const ErrorPage: FC<Props> = ({ error }) => {
    return (
        <div className="flex justify-center items-center w-screen h-screen theme-background text-custom-light-blue">
            <div className="max-w-2xl">
                <p className="mt-4 mb-4">
                    This app is only accessible to the members of the Group on
                    Earth Observations (GEO) ArcGIS Online Organization.
                </p>

                <p>
                    Please try to{' '}
                    <span
                        className="  text-custom-brand cursor-pointer"
                        onClick={() => {
                            signOut();
                        }}
                    >
                        sign in
                    </span>{' '}
                    again using the correct ArcGIS Online account.
                </p>
            </div>
        </div>
    );
};
