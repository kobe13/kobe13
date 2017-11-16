// Sample containing dummy data
import * as React from "react";
import {ContentIntroduction} from "../common/contentIntroduction";
import {TipSection} from "./sample3";
import {TestEntryForm} from "../testEntry/testEntryForm";
import {createMarkWithErrorAction} from "../testEntry/testInputField";
import {Dispatch} from "redux";
import {PageState} from "../store";
import {connect} from "react-redux";
import {Component} from "react";

interface ErrorProperties {
    errorType: number;
}

interface DispatchProps {
    testValidationCallback: (errorType: number) => void;
}

type Properties = ErrorProperties & DispatchProps;

export enum messageType {
    TypeDefault = "Default Message",
    Type500 = "Server Error Type 500",
    Type400 = "Server Error Type 400"
}

export const errorMessageDisplay = (err: number) => {
    if (err === 500 || err === 502) {
        return messageType.Type500;
    } else if (err === 400) {
        return messageType.Type400;
    } else {
        return messageType.TypeDefault;
    }
};

class View extends Component<Properties> {
    constructor() {
        super();
    }

    public componentDidMount() {
        this.props.testValidationCallback(this.props.errorType);
    }

    public render() {
        return (
            <div>
                <div id="test-entry-form" className="content">
                    <div className="sc-grid-row margin-bottom-xxl">
                        <div className="sc-grid-col-1"/>
                        <div className="sc-grid-col-10">
                            <div className="sc-grid-row">
                                <div className="sc-grid-col-7 sc-grid-col-s-12">
                                    <div className="sc-grid-row">
                                        <div className="sc-grid-col-12">
                                            {this.props.errorType !== 500 &&
                                            this.props.errorType !== 502 &&
                                            this.props.errorType !== 429 &&
                                            <ContentIntroduction
                                                headline="Headline"/>}

                                            <p className="sc-font-error">
                                                {errorMessageDisplay(this.props.errorType)}
                                            </p>
                                        </div>
                                    </div>
                                    <TestEntryForm />
                                </div>
                                <div className="sc-grid-col-1"/>
                                <div className="sc-grid-col-4 sc-grid-col-s-12">
                                    <TipSection
                                        id="tipTest"
                                        title="Pellentesque id arcu?"
                                        text="Nullam condimentum mollis mauris eget congue."
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sc-grid-col-1"/>
                    </div>
                </div>
            </div>
        );
    }
}

// ****** REACT <-> REDUX ******
const mapDispatchToProperties = (dispatch: Dispatch<PageState>): DispatchProps => ({
    testValidationCallback: (errorType: number) => {
        if (errorType !== 500 && errorType !== 502 && errorType !== 429) {
            dispatch(createMarkWithErrorAction());
        }
    }
});

export const TestError = connect(null, mapDispatchToProperties)(View);