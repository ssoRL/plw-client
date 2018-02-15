import * as React from 'react';
import { PageSummary } from './page-summary.component';
import { Test, Page } from '../api/api';

export interface HomeProps {
    api: Test;
}

export interface HomeState {
    pages: Page[];
}

export class Home extends React.Component<HomeProps, HomeState> {
    state: HomeState = {
        pages: []
    };

    constructor(props: HomeProps) {
        super(props);

        // Get the pages
        this.props.api.ApiPagesGet({}, {}).then(pages => {
            this.setState({pages: pages});
        });
    }

    render() {
        return (
            <div className="home-component">
                {/* <CreateNewPageButton handleClick={this.newClick}/> */}
                {this.state.pages.map(page =>
                    PageSummary(page)
                )}
            </div>
        );
    }
}