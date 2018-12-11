import React from 'react';

import config from '../config';
import AthleteBlock from './AthleteBlock';

export default class AthletesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      athletes: [],
    };
  }

  componentDidMount() {
    fetch(`${config.rest_url}/athletes`)
      .then(response => response.json())
      .then((athletes) => {
        this.setState({ athletes });
      });
  }

  render() {
    const { athletes } = this.state;

    return (
      <div className="athletes-list">
        {
          athletes.map(a => <AthleteBlock key={a.code} {...a} />)
        }
      </div>
    );
  }
}
