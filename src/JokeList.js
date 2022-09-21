import React from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";
// import JokeListWrapper from "./JokeListWrapper";
// import JokeWrapper from "./JokeWrapper";

class JokeList extends React.Component {
  static defaultProps = {
    numJokesToGet: 10
  };
  constructor(props) {
    super(props);
    this.state = { jokes: [] };
    // Not sure why it doesnʻt work when I put this prop here instead of in statid default props:
    // this.numJokesToGet = 10;
    this.generateNewJokes = this.generateNewJokes.bind(this);
    this.resetVotes = this.resetVotes.bind(this);
    this.vote = this.vote.bind(this);
    this.jokeVotes = {}
  }

  componentDidMount() {
    if (this.state.jokes.length < this.props.numJokesToGet) this.getJokes();
  }

  componentDidUpdate() {
    if (this.state.jokes.length < this.props.numJokesToGet) this.getJokes();
  }

  async getJokes() {
    try {
      let jokes = this.state.jokes;
      let seenJokes = new Set(jokes.map(j => j.id));

      while (jokes.length < this.props.numJokesToGet) {
          let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
          });
          let { status, ...jokeObj } = res.data;

          if (!seenJokes.has(jokeObj.id)) {
            seenJokes.add(jokeObj.id);
            this.jokeVotes[jokeObj.id] = this.jokeVotes[jokeObj.id] || 0;
            jokes.push({ ...jokeObj, votes: this.jokeVotes[jokeObj.id], seen: false });
          } 
          else {
            console.error("duplicate found!");
          }

      }
      this.setState({ jokes });
    }
    catch (e) {
      console.log(e);
    }
  }

  generateNewJokes() {
    this.setState(nj => ({ jokes: nj.jokes.filter(j => j.seen)}));
  }

  resetVotes() {
    this.setState(rv => ({
      jokes: rv.jokes.map(joke => ({ ...joke, votes: 0 }))
    }));
  }

  vote(id, delta) {
    this.jokeVotes[id] = (this.jokeVotes[id] || 0) + delta;
    this.setState(jv => ({
      jokes: jv.jokes.map(j =>
        j.id === id ? { ...j, votes: j.votes + delta } : j)
    }));
  }

  render() {
    let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);
    return (
      <div className="JokeList">
        <button className="JokeList-getmore" onClick={this.generateNewJokes}>
          Get New Jokes
        </button>
  
        {sortedJokes.map(j => (
          <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={this.vote} />
        ))}
      </div>
      )
  }
}

export default JokeList;






// MY ATTEMPT USING WRAPPERS:

// class JokeList extends React.Component {

//   render() {
//     return (
//       <div>
//         <JokeListWrapper render={obj => (
//         <div className="JokeList">
//           <button className="JokeList-getmore" onClick={obj.generateNewJokes}>
//             Get New Jokes
//           </button>
//           {console.log(obj)}
//         </div>
//         )}
//         />
//         <JokeWrapper render={obj => (
//           <div className="Joke">
//             <div className="Joke-votearea">
//               <button onClick={obj.upVote}>
//                 <i className="fas fa-thumbs-up" />
//               </button>    
//               <button onClick={obj.downVote}>
//                 <i className="fas fa-thumbs-down" />
//               </button>    
//               {obj.votes}
//             </div>
//             {console.log(obj)} 
//             <div className="Joke-text">{obj.text}</div>
//           </div>
//         )}
//         />
//       </div>

//     )
//   }
// }

// export default JokeList;






// ORIGINAL CODE:

// function JokeList({ numJokesToGet = 10 }) {
//   const [jokes, setJokes] = useState([]);

//   /* get jokes if there are no jokes */

//   useEffect(function() {
//     async function getJokes() {
//       let j = [...jokes];
//       let seenJokes = new Set();
//       try {
//         while (j.length < numJokesToGet) {
//           let res = await axios.get("https://icanhazdadjoke.com", {
//             headers: { Accept: "application/json" }
//           });
//           let { status, ...jokeObj } = res.data;
  
//           if (!seenJokes.has(jokeObj.id)) {
//             seenJokes.add(jokeObj.id);
//             j.push({ ...jokeObj, votes: 0 });
//           } else {
//             console.error("duplicate found!");
//           }
//         }
//         setJokes(j);

//       } catch (e) {
//         console.log(e);
//       }
//     }

//     if (jokes.length === 0) getJokes();
//   }, [jokes, numJokesToGet]);

//   /* empty joke list and then call getJokes */

//   function generateNewJokes() {
//     setJokes([]);
//   }

//   /* change vote for this id by delta (+1 or -1) */

//   function vote(id, delta) {
//     setJokes(allJokes =>
//       allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
//     );
//   }

//   /* render: either loading spinner or list of sorted jokes. */

//   if (jokes.length) {
//     let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
//     return (
//       <div className="JokeList">
//         <button className="JokeList-getmore" onClick={generateNewJokes}>
//           Get New Jokes
//         </button>
  
//         {sortedJokes.map(j => (
//           <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={vote} />
//         ))}
//       </div>
//     );
//   }

//   return null;

// }

// export default JokeList;

