import * as React from "react";
import {Component} from "react";
import {PageTemplate} from "../common/pageTemplate"

class View extends Component {
  constructor() {
    super();
  }

  render() {
    return (
        <PageTemplate>
          <section>
            <h1>TEST ZONE</h1>
            <p>Work In Progress...</p>
          </section>
        </PageTemplate>
    );
  }
}

export const TestZone = View;