import React from "react";
import "./Joke.css";
// import JokeWrapper from "./JokeWrapper"


class Joke extends React.Component {
  constructor (props) {
    super(props);
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
  }

  upVote() {
    this.props.vote(this.props.id, +1);
  }

  downVote() {
    this.props.vote(this.props.id, -1);
  }

  render() {
    return (
        <div className="Joke">
          <div className="Joke-votearea">
            <button onClick={this.upVote}>
              <i className="fas fa-thumbs-up" />
            </button>    
            <button onClick={this.downVote}>
              <i className="fas fa-thumbs-down" />
            </button>    
            {this.props.votes}
          </div> 
          <div className="Joke-text">{this.props.text}</div>
        </div>
    )
  }
}

export default Joke;

// MY SECOND ATTEMPT: 

// class Joke extends React.Component {
//   render() {
//     return (
//       <JokeWrapper render={obj => (
//         <div className="Joke"><p>I am a joke!</p>
//           <div className="Joke-votearea">
//             <button onClick={obj.upVote}>
//               <i className="fas fa-thumbs-up" />
//             </button>    
//             <button onClick={obj.downVote}>
//               <i className="fas fa-thumbs-down" />
//             </button>    
//             {obj.votes}
//           </div> 
//           <div className="Joke-text">{obj.text}</div>
//         </div>
//       )}
//       />
//     )
//   }
// }

// export default Joke;




// MY FIRST ATTEMPT:

// class Joke extends React.Component {
//   constructor({ vote, votes, text, id }) {
//     super({ vote, votes, text, id });
//   }
    
//   upVote = () => this.vote(this.id, +1);
//   downVote = () => this.vote(this.id, -1);

//   render() {
//     return (
//       <div className="Joke">
//         <div className="Joke-votearea">
//           <button onClick={this.upVote}>
//             <i className="fas fa-thumbs-up" />
//           </button>
  
//           <button onClick={this.downVote}>
//             <i className="fas fa-thumbs-down" />
//           </button>
  
//           {this.votes}
//         </div>
  
//         <div className="Joke-text">{this.text}</div>
//       </div>
//     );
//   }
// }

// export default Joke;



// ORIGINAL CODE:

// function Joke({ vote, votes, text, id }) {
//   const upVote = () => vote(id, +1);
//   const downVote = () => vote(id, -1);

//   return (
//     <div className="Joke">
//       <div className="Joke-votearea">
//         <button onClick={upVote}>
//           <i className="fas fa-thumbs-up" />
//         </button>

//         <button onClick={downVote}>
//           <i className="fas fa-thumbs-down" />
//         </button>

//         {votes}
//       </div>

//       <div className="Joke-text">{text}</div>
//     </div>
//   );
// }

// export default Joke;