// Sample containing dummy data
import * as React from "react";
import {LoadingIndicator} from "../common/loadingIndicator";
import {Error} from "./error";
import {Component} from "react";
import {connect, Dispatch} from "react-redux";
import {trackTestSelectionButton} from "../common/tracking/tracking";
import {PageState, TestProps} from "../store";
import {State} from "../entry/inputField";
import {Headline} from "../common/headline/index";
import ButtonBlock from "../common/buttonBlock";
import {TipSection} from "./sample3";
import BackButton from "../common/backButton/view";
import ManualTestItem from "../tests/manualTest/view";
import TestInfo from "./TestInfo";
// images
import "./image1.jpg";
import "./image1-thumb.jpg";

interface DispatchProps {
    onTestSelection: () => void;
}

enum ResultDisplayState {
    InProgress,
    Success,
    Failure
}

export interface ResultState {
    resultDisplayState: ResultDisplayState;
    identificationResult: string;
    httpStatusCode: number;
}

export const initialState: ResultState = {
    resultDisplayState: ResultDisplayState.InProgress,
    identificationResult: "",
    httpStatusCode: null
};

declare const config: TestProps & DispatchProps;

const callResolveService = (test: string) =>
    new Promise((resolves, rejects) => {
        const api = `https://fake-url/${test}`;
        const request = new XMLHttpRequest();
        request.open("GET", api);
        request.onload = () =>
            request.status === 200
                ? resolves(JSON.parse(request.response))
                : resolves(request.status);
        request.onerror = err => rejects(err);
        request.send();
    });

class View extends Component<> {
    public state: ResultState;

    constructor() {
        super();
        this.state = initialState;
    }

    public componentDidMount() {
        callResolveService(this.props.input).then(res => {
            if (typeof res === "object") {
                this.setState({
                    resultDisplayState: ResultDisplayState.Success,
                    identificationResult: res
                });
            } else {
                this.setState({
                    resultDisplayState: ResultDisplayState.Failure,
                    httpStatusCode: res
                });
            }
        }, err => new Error("Error"));
    }

    public render() {
        const toDisplay = () => {
            const result: {} = this.state.identificationResult;
            const statusCode: number = this.state.httpStatusCode;

            if (this.state.resultDisplayState === ResultDisplayState.InProgress) {
                return <LoadingIndicator label="Please wait"/>;
            }
            if (this.state.resultDisplayState === ResultDisplayState.Failure) {
                return (
                    <div id="resultFailure">
                        <Error errorType={statusCode}/>
                    </div>
                );
            }
            if (this.state.resultDisplayState === ResultDisplayState.Success) {
                return (
                    <div id="test-options" className="content">
                        <div className="sc-grid-row margin-bottom-xxl">
                            <div className="sc-grid-col-1"/>
                            <div className="sc-grid-col-10">
                                <div className="sc-grid-row">
                                    <div className="sc-grid-col-7 sc-grid-col-s-12">
                                        <Headline text="Headline"/>
                                        <div className="sc-grid-row">
                                            <div className="sc-grid-col-12">
                                                Pellentesque id arcu vitae justo maximus pharetr {result.original}{" "}
                                                on dui tristique fermentum ut nec turpis.
                                            </div>
                                        </div>
                                        <div className="sc-grid-row text-center-mobile">
                                            <TestInfo
                                                id={result.id}
                                                onChange={config.onTestSelection}
                                            />
                                        </div>
                                        <ManualTestItem
                                            label1="Pellentesque id arcu vitae justo maximus pharetr:"
                                            link="/fake_url2"
                                            buttonText="Click here"
                                        />
                                        <ButtonBlock>
                                            <BackButton />
                                        </ButtonBlock>
                                    </div>
                                    <div className="sc-grid-col-1"/>
                                    <div className="sc-grid-col-4 sc-grid-col-s-12">
                                        <TipSection
                                            id="resultTest"
                                            title="Pellentesque id arcu?"
                                            text="Nullam condimentum mollis mauris eget congue."
                                            imgUrl="/assets/image1"
                                            imgThumbUrl={true}
                                            imgType="jpg"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sc-grid-col-1"/>
                        </div>
                    </div>
                );
            }
        };

        return (
            <div>
                {toDisplay()}
            </div>
        );
    }
}

// ****** REACT <-> REDUX ******
const mapStateToProperties = (pageState: PageState): State => pageState.entry.inputState;
const mapDispatchToProps = (dispatch: Dispatch<PageState>): DispatchProps => ({
    onTestSelection: () => {
        dispatch(trackTestSelectionButton());
    }
});

export const Result = connect(mapStateToProperties, mapDispatchToProps)(View);
