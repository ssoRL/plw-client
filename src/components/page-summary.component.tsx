import * as React from 'react';
import { FeedItem } from '../api/api';

export const PageSummary = (props: FeedItem) => {
    return (
        <div className="feed-box">
            <div className="home-button">{props.name}</div>
        </div>
    );
};
