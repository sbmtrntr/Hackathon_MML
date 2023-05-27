import React from 'react';
import './App.css';



class App extends React.Component {
  render() {
    return (
          <div className="app-container">
            <h1 className="title">目指せ タッチタイパーマン</h1>
            <button className="how-to-play-button">遊び方</button>
            <button className="play-button">難易度を選択</button>
      </div>
    );
  }
}

export default App;
