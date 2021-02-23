import React, {Component} from 'react';
import './App.css';

class App extends Component {

  // Sets initial states
  state = {
    response: [],
    post: '',
    responseToPost: '',
  }

  // When page loads, calls callApi function then sets 'response' state to response from
  // callApi (array of province names)
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({response: res.express}))
      .catch(err => console.log(err));
  }

  // Calls GET from server which returns an array of province names
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  // Function that runs when submit button is pressed; this calls POST from the server
  // to get back data based on the value inputted by the dropdown menu
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({post: this.state.post})
    });
    const body = await response.text();

    this.setState({responseToPost: body});
  };

  // HTML that renders the page. This will change based on the inputs in brackets {}
  render() {
    const provinces = this.state.response;
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
            <h1>Coronavirus Tracker</h1>
              <select onChange={e => this.setState({post: e.target.value})}>
                {
                  provinces.map(province => {
                    return (
                      <option value={province}> {province} </option>
                    )
                  })
                }
              </select>
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }

}

export default App;
