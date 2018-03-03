import * as React from 'react';
import { Message, API } from '../api/api';

export class FeedThreadProps {
    id: number;
    api: API;
}

export class FeedThreadState {
    name: string;
    messages: Message[];
}

export class FeedThread extends React.Component<FeedThreadProps, FeedThreadState> {
    state = {
        name: '',
        messages: []
    };

    constructor(props: FeedThreadProps) {
        super(props);

        // make an api call to determine the
    }

    updateName = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({name: event.currentTarget.value});
    }

    submit = () => {
        // this.props.createFeedThread(this.state.name);
    }

    render() {
        return (
            <div>Some Thread Stuff</div>
        );
    }
}