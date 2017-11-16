// Sample containing dummy data
import * as React from "react";

interface Props {
    title: string;
    id: string;
    imgThumbUrl?: boolean;
    imgUrl?: string;
    imgType?: string;
}

export const ImageLightbox = (props: Props): JSX.Element =>
    <div>
        <a data-lightbox-open={props.id}>
            <img
                data-src={
                    props.imgThumbUrl
                        ? props.imgUrl + "-thumb." + props.imgType
                        : props.imgUrl + "." + props.imgType
                }
                src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                className="tip-section-img tip-section-img-thumb lazy-image lazyload"
                alt={props.title}
            />
        </a>
        <lightbox className="lightbox" id={props.id} data-custom="custom-lightbox">
            <div className="lightbox__container">
                <button className="lightbox__close" data-lightbox-close={true} data-test="icon">
                    <icon type="close"/>
                </button>
                <div className="lightbox__content">
                    <br />
                    <br />
                    <img
                        data-src={props.imgUrl + "." + props.imgType}
                        src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                        className="tip-section-img lazy-image lazyload"
                        alt={props.title}
                    />
                </div>
            </div>
        </lightbox>
    </div>;