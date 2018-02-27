import * as React from 'react';

export interface FeedBoxProps {
    title: string;
}

export interface FeedBoxState {
    expanded: boolean;
}

export class FeedBox extends React.Component<FeedBoxProps, FeedBoxState> {
    state: FeedBoxState = {
        expanded: false
    };

    constructor(props: FeedBoxProps) {
        super(props);
    }

    toggleFeedBox = () => {
        this.setState({expanded: !this.state.expanded});
    }

    render() {
        return (
            <div className="feed-box">
                <div className="feed-box-header" onClick={this.toggleFeedBox}>{this.props.title}</div>
                <div className={`feed-box-main${this.state.expanded ? '' : ' hide'}`}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}