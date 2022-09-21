import React from "react";

class JokeWrapper extends React.Component {
    upVote = () => this.vote(this.id, +1);
    downVote = () => this.vote(this.id, -1);

    render() {
        return (
            <div>
                {this.props.render({
                    vote: this.vote,
                    votes: this.votes, 
                    text: this.text,
                    id: this.id,
                    upVote: this.upVote,
                    downVote: this.downVote
                })}
            </div>
        );
    }
}

export default JokeWrapper;
