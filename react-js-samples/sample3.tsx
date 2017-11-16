// Sample containing dummy data
import * as React from "react";
import {ImageLightbox} from "./sample4";

interface Properties {
    id: string;
    title: string;
    text: string;
    imgUrl?: string;
    imgThumbUrl?: boolean;
    imgType?: string;
}

export const TipSection = (properties: Properties): JSX.Element =>
    <div>
        <div className="expandable-box tip-section">
            <input id={properties.id} type="checkbox" className="expandable-box__toggle"/>
            <h1 className="tip-section-headlines c-font margin-bottom-xl font expandable-box__title">
                <label htmlFor={properties.id} className="expandable-box__label font-l">
                    <span>
                        {properties.title}
                    </span>
                </label>
            </h1>
            <div className="expandable-box__content">
                <div>
                    {properties.text}
                </div>
                <br />
                {properties.imgUrl &&
                <ImageLightbox
                    id={properties.id}
                    imgUrl={properties.imgUrl}
                    title={properties.title}
                    imgThumbUrl={properties.imgThumbUrl}
                    imgType={properties.imgType}
                />}
            </div>
        </div>
    </div>;