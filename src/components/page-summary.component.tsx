import * as React from 'react';
import { Page } from '../api/api';

export const PageSummary = (props: Page) => {
    let colorStyle: React.CSSProperties = {
        backgroundColor: props.color
    };

    return (
        <div className="home-button-container" style={colorStyle}>
            <div className="home-button">{props.name}</div>
            <div className="window-to-latest">{props.date}</div>
        </div>
    );
};
