import React from "react";
import {Axios as axios} from "axios";

class JokeListWrapper extends React.Component {
    state = { jokes: [] };

    componentDidMount() {
        if (this.state.jokes.length < this.numJokesToGet) this.getJokes();
    }

    componentDidUpdate() {
        if (this.state.jokes.length < this.numJokesToGet) this.getJokes();
    }

    async getJokes() {
        let j = [...this.jokes];
        let seenJokes = new Set();
        try {
        while (j.length < this.numJokesToGet) {
            let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" }
            });
            let { status, ...jokeObj } = res.data;
    
            if (!seenJokes.has(jokeObj.id)) {
            seenJokes.add(jokeObj.id);
            j.push({ ...jokeObj, votes: 0 });
            } else {
            console.error("duplicate found!");
            }
            }
        }
        catch (e) {
        console.log(e);
        } 
        this.jokes = j;
    }

    generateNewJokes() {
        this.jokes = [];
      }

    vote(id, delta) {
        this.jokes = (allJokes =>
          allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
        );
      }
    
    sortJokes() {
        this.sortedJokes = [...this.jokes].sort((a, b) => b.votes - a.votes);
    }

    render() {
        return (
            <div>
                {this.props.render({
                    jokes: this.state.jokes,
                    numJokesToGet: 10,
                    componentDidMount: this.componentDidMount,
                    componentDidUpdate: this.componentDidUpdate,
                    generateNewJokes: this.generateNewJokes,
                    vote: this.vote,
                    sortJokes: this.sortJokes,
                    getJokes: this.getJokes
                })}
            </div>
        );
    }
}

export default JokeListWrapper;
