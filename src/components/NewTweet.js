import React, { Component } from "react";
import { handleAddTweet } from "../actions/tweets";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
class NewTweet extends Component {
  state = {
    text: "",
    toHome: false
  };

  handleChange = e => {
    e.preventDefault();
    const text = e.target.value;

    this.setState({
      text: text
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { text } = this.state;
    const { dispatch, id } = this.props;

    dispatch(handleAddTweet(text, id));

    this.setState({
      text: "",
      toHome: id ? false : true
    });
  };

  render = () => {
    const { text, toHome } = this.state;

    if (toHome) {
      return <Redirect to="/" />;
    }

    const tweetLeft = 280 - text.length;
    return (
      <div>
        <h3 className="center">Compose new Tweet</h3>
        <form className="new-tweet" onSubmit={this.handleSubmit}>
          <textarea
            placeholder="What's happening?"
            className="textarea"
            onChange={this.handleChange}
            maxLength={280}
            value={text}
          />
          {tweetLeft <= 100 && <div className="tweet-length">{tweetLeft}</div>}
          <button className="btn" type="submit" disabled={text === ""}>
            Submit
          </button>
        </form>
      </div>
    );
  };
}

export default connect()(NewTweet);
