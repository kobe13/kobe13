import * as React from "react";
import {PageTemplate} from "../common/pageTemplate"

export const Error404 = ({location}) =>
    <PageTemplate>
      <section>
        <h1>WOOOPS! Resource not found at "{location.pathname}"</h1>
      </section>
    </PageTemplate>;