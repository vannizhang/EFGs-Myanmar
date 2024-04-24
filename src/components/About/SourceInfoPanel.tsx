import React, { FC } from 'react';
import { SourceInfoData } from './config';

type Props = {
    data: SourceInfoData;
};

type InfoRowProps = {
    name: string;
    value: string;
    link?: string;
};

const InfoRow: FC<InfoRowProps> = ({ name, value, link }) => {
    return (
        <div className="text-sm mb-2 pb-2 border-b border-custom-background-2">
            <h4 className="mb-1 text-xs text-custom-text-2 opacity-80">
                {name}
            </h4>
            <div>
                {link ? (
                    <calcite-button
                        href={link}
                        target="_blank"
                        appearance="outline"
                        kind="neutral"
                        icon-start="link"
                        scale="s"
                    >
                        Open Link
                    </calcite-button>
                ) : (
                    <span>{value}</span>
                )}
            </div>
        </div>
    );
};

export const SourceInfoPanel: FC<Props> = ({ data }) => {
    return (
        <div className="mb-8">
            <h3 className="text-2xl mb-4">{data.title}</h3>

            <hr className="mb-6 opacity-25" />

            <div className=" flex">
                <div className="flex-grow">
                    <div className="mb-8">
                        <h3 className="mb-2 text-custom-text-2 text-lg">
                            Abstract:
                        </h3>
                        <p className="">{data.Abstract}</p>
                    </div>

                    <div className="mb-8">
                        <h3 className="mb-2 text-custom-text-2 text-lg">
                            Description:
                        </h3>
                        <p className="">{data.Description}</p>
                    </div>

                    <div className="mb-8">
                        <h3 className="mb-2 text-custom-text-2 text-lg">
                            Provider:
                        </h3>
                        <p className="">{data.Provider}</p>
                    </div>

                    <div className="mb-8">
                        <h3 className="mb-2 text-custom-text-2 text-lg">
                            Citation:
                        </h3>
                        <p className="">{data.Citation}</p>
                    </div>
                </div>

                <div className="shrink-0 w-1/4 pl-12">
                    <InfoRow name="Access Date" value={data.AccessDate} />
                    <InfoRow name="Analyst" value={data.Analyst} />
                    <InfoRow
                        name="Year Represented"
                        value={data.YearRepresented}
                    />
                    <InfoRow name="Short Name" value={data.ShortName} />
                    <InfoRow name="Published Year" value={data.PublishedYear} />
                    <InfoRow name="Contact" value={data.Contact} />
                    <InfoRow name="email" value={data.email} />
                    <InfoRow name="License" value={data.License} />
                    <InfoRow
                        name="License URL"
                        value={data.LicenseURL}
                        link={data.LicenseURL}
                    />
                    <InfoRow name="URL" value={data.URL} link={data.URL} />
                    <InfoRow name="DOI" value={data.DOI} link={data.DOI} />
                </div>
            </div>
        </div>
    );
};
