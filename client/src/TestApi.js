import React, { Component } from 'react';

class TestApi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  getData() {
    fetch('https://www.iou-app.com/')
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          username: data.username,
          password: data.password,
        })
      );
  }

  render() {
    return (
      <div>
        <h2>Click to retrieve data</h2>
        <button onClick={() => this.getData()}>Click</button>
        <p>{this.state.username}</p>
        <p>{this.state.password}</p>
      </div>
    );
  }
}

export default TestApi;
