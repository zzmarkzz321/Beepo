import React, { Component } from 'react';
import {getTopFive} from "../../helpers/firebase";

class LeaderBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leaders: [],
        };
    }

    componentDidMount() {
        getTopFive()
            .then(leaders => {
                this.setState({
                    leaders,
                })
            });
    }

    renderLeaderBoards = () => {
        let {leaders} = this.state;
        leaders = leaders.reverse();
        return leaders.map((leader, index) => {
            let leaderObj = Object.assign({}, JSON.parse(leader));
            const leaderName = JSON.stringify(leaderObj.name);
            const leaderPoints = JSON.stringify(leaderObj.points);
            return (
                <tr key={index} className='leader-board-stats'>
                    <td>{index+1}</td>
                    <td>{leaderName || ''}</td>
                    <td>{leaderPoints || ''}</td>
                </tr>
            )
        })
    };

    render() {
        return (
            <div className="leader-boards">
                <h1>LeaderBoards</h1>
                <table align='center'>
                    <tr>
                        <th>Rank</th>
                        <th>User</th>
                        <th>Point</th>
                    </tr>
                    {this.renderLeaderBoards()}
                </table>
            </div>
        );
    }
}

export default LeaderBoard;
