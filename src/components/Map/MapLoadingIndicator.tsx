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

import classNames from 'classnames';
import React, { CSSProperties, FC } from 'react';

type Props = {
    /**
     * if true, show map loading indicator
     */
    active: boolean;
};

export const MapLoadingIndicator: FC<Props> = ({ active }: Props) => {
    if (!active) {
        return null;
    }

    return (
        <>
            <div
                className={classNames(
                    'absolute top-0 left-0 bottom-0 right-0 flex items-center pointer-events-none z-10'
                )}
            >
                <calcite-loader />
            </div>
        </>
    );
};
