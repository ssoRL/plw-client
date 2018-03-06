import * as React from 'react';
import { API, FeedItem } from '../api/api';
import { FeedBox } from './feed-box';
import { NewThread } from './new-thread';
import { FeedThread } from './feed-thread';

export interface HomeProps {
    api: API;
}

export interface HomeState {
    feed: FeedItem[];
}

export class Home extends React.Component<HomeProps, HomeState> {
    state: HomeState = {
        feed: []
    };

    constructor(props: HomeProps) {
        super(props);

        // Get the pages
        this.props.api.ApiFeedsGet({}, {}).then(feed => {
            this.setState({ feed: feed });
        });
    }

    createThread = (name: string) => {
        const newId = this.props.api.ApiThreadsPost({ name: name }, {});
        // tslint:disable-next-line:no-console
        console.log(newId);
    }

    render() {
        return (
            <div className="home-component">
                <div className="layout-buffer" />
                <div className="layout-main">
                    <FeedBox title="Create New Thread"><NewThread createThread={this.createThread} /></FeedBox>
                    {this.state.feed.map(
                        feed => (
                            <FeedBox title={feed.name}>
                                <FeedThread id={feed.id} name={feed.name} api={this.props.api} />
                            </FeedBox>
                        )
                    )}
                </div>
                <div className="layout-buffer" />
            </div>
        );
    }
}