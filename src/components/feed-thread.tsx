import * as React from 'react';
import { Message, API } from '../api/api';

interface UnconfirmedMessage {
    content: string;
}

export class FeedThreadProps {
    id: number;
    name: string;
}

export class FeedThreadState {
    messages: (Message | UnconfirmedMessage)[];
    newMessage: string;
}

export class FeedThread extends React.Component<FeedThreadProps, FeedThreadState> {
    state: FeedThreadState = {
        messages: [],
        newMessage: ''
    };

    constructor(props: FeedThreadProps) {
        super(props);

        // make an api call to determine the
        API.Instance().ApiThreadsByIdGet({id: this.props.id}).then(
            thread => {
                this.setState({messages: thread.messages});
            }
        );
    }

    updateNewMessage = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({newMessage: event.currentTarget.value});
    }

    sendMessage = () => {
        const content = this.state.newMessage;
        const messagePost = {
            userId: 0, 
            threadId: this.props.id, 
            content: content
        };
        API.Instance().ApiMessagesPost(messagePost);
        const messages = this.state.messages;
        messages.push({content: content});
        this.setState({messages: messages});
    }

    render() {
        return (
            <div>
                {this.state.messages.map(
                    message => (<div>{message.content}</div>)
                )}
                <input type="text" onChange={this.updateNewMessage} />
                <button onClick={this.sendMessage}>Send</button>
            </div>
        );
    }
}