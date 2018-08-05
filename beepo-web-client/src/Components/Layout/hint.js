import React, { Component } from 'react';
import {getBeepoHint} from "../../helpers/firebase";

class Hint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hint: '',
        };
    }

    componentDidMount() {
        getBeepoHint()
            .then(hint => {
                console.log(hint);
                this.setState({
                    hint,
                })
            })
    }

    renderHint = () => {
        const {hint} = this.state;
        return <p>{hint}</p>
    };

    render() {
        return (
            <div className="hint">
                <h1>Hint Page</h1>
                {this.renderHint()}
            </div>
        );
    }
}

export default Hint;
