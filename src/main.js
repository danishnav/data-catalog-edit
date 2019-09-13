import * as React from "react";
import { Block } from "baseui/block";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@data-catalog/theme";
import { Header } from "@data-catalog/header";

import Routes from "./routes";

class Main extends React.Component {
    render() {
        const { history } = this.props;

        return (
            <React.Fragment>
                <ThemeProvider>
                    <Header />
                    <Block
                        margin="0 auto"
                        paddingTop="1rem"
                        width="80%"
                        height="100%"
                    >
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
