import * as React from "react";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, styled } from "baseui";
import { Block } from "baseui/block";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@data-catalog/theme";

import Routes from "./routes";

class Main extends React.Component {
    render() {
        const { history } = this.props;

        return (
            <React.Fragment>
                <ThemeProvider>
                    <Block padding="3rem 10rem" height="100%">
                        <Router history={history}>
                            <Routes />
                        </Router>
                    </Block>
                </ThemeProvider>
            </React.Fragment>
        );
    }
}

export default Main;
