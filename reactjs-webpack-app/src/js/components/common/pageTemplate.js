import * as React from "react";
import {MainMenu} from "./mainMenu";

export const PageTemplate = ({children}) =>
    <div>
      <MainMenu/>
      {children}
    </div>;