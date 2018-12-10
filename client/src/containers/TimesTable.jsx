import React from 'react';
import { connect } from 'react-redux';

function TimesTable(props) {
  const { times } = props;

  return (
    <table>
      <thead>
        <tr>
          <th>Athlete</th>
          <th>Finish line time</th>
        </tr>
      </thead>
      <tbody>
        { Object.entries(times).map(([code, time]) => (
          <tr key={code}>
            <td>{`${time.startNumber}. ${time.name}`}</td>
            <td>{time.lineTime || ''}</td>
          </tr>
        )) }
      </tbody>
    </table>
  );
}

function mapStateToProps(state) {
  return {
    times: state.times,
  };
}

export default connect(mapStateToProps)(TimesTable);
