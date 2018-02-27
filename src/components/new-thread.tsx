import * as React from 'react';

export class NewThreadState {
    name: string;
}

export class NewThreadProps {
    createThread: (name: string) => void;
}

export class NewThread extends React.Component<NewThreadProps, NewThreadState> {
    state = {
        name: ''
    };

    constructor(props: NewThreadProps) {
        super(props);
    }

    updateName = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({name: event.currentTarget.value});
    }

    submit = () => {
        this.props.createThread(this.state.name);
    }

    render() {
        return (
            <div>
                <input type="text" onChange={this.updateName} />
                <button onClick={this.submit}>Submit</button>
            </div>
        );
    }
}