import * as React from 'react';

export interface FeedBoxProps {
    title: string;
}

export interface FeedBoxState {
    show: boolean;
    animating: boolean;
    mainStyles: React.CSSProperties;
}

export class FeedBox extends React.Component<FeedBoxProps, FeedBoxState> {
    state: FeedBoxState = {
        show: false,
        animating: false,
        mainStyles: { maxHeight: 0 }
    };

    mainDiv: HTMLDivElement;

    constructor(props: FeedBoxProps) {
        super(props);
    }

    watchMain = (mainDivParam: HTMLDivElement | null) => {
        if (mainDivParam instanceof HTMLDivElement) {
            this.mainDiv = mainDivParam;
            const childChangeObserver = new MutationObserver(() => {
                if (this.state.show) {
                    const targetHeight = Math.min(500, this.mainDiv.scrollHeight);
                    this.setState({ mainStyles: { maxHeight: targetHeight } });
                }
            });
            childChangeObserver.observe(this.mainDiv, { childList: true, subtree: true });
        } else {
            throw 'Main div must not be null';
        }
    }

    toggleFeedBox = () => {
        const willShow = !this.state.show;
        const targetHeight = willShow ? 500 : 0;
        this.setState({ show: willShow, mainStyles: { maxHeight: targetHeight }, animating: true });
        this.mainDiv.addEventListener('transitionend', () => {
            const scrollHeight = this.mainDiv.scrollHeight;
            const finalHeight = Math.min(scrollHeight, targetHeight);
            this.setState({ animating: false, mainStyles: { maxHeight: finalHeight } });
        });
    }

    render() {
        return (
            <div className="feed-box">
                <div className="header" onClick={this.toggleFeedBox}>{this.props.title}</div>
                <div
                    ref={this.watchMain}
                    className={`main ${this.state.show ? 'notslide-down' : 'notslide-up'}`}
                    style={this.state.mainStyles}
                >
                    {this.props.children}
                </div>
            </div>
        );
    }
}