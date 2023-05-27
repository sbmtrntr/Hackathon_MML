import React from 'react';
import { Link } from 'react-router-dom';

class DifficultySelection extends React.Component {
  render() {
    return (
      <div>
        <h2>難易度を選択してください</h2>
        <Link to="/play/easy">
          <button>かんたん</button>
        </Link>
        <Link to="/play/normal">
          <button>ふつう</button>
        </Link>
        <Link to="/play/hard">
          <button>むずかしい</button>
        </Link>
      </div>
    );
  }
}

export default DifficultySelection;
