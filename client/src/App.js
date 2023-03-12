import React, { useState} from "react"
import './App.css';
import Card from './Components/Card'

class App extends React.Component {
  state = {
    name: ""
  }

  componentDidMount() {
    fetch("http://localhost:3001")
      .then(res => res.json())
      .then(data => this.setState({ name: data.name }))
  }

  render() {
    return (
      <h1>Hello {this.state.name}!</h1>
    )
  }
}

function App() {
  const [username, setUsername] = useState('Your Username');
  const [game_review_title_1, setGameReviewTitle1] = useState('Review Title');
  const [game_review_1, setGameReview1] = useState('Your Review');

  return (
    <div className='App'>
      <Card username={username} game_review_title_1={game_review_title_1} game_review_1={game_review_1}/>
    </div>
  );
}

export default App