import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './TimesTable.css';

export default function TimesTable(props) {
  const { times } = props;

  const sortedTimes = times.slice().sort((a, b) => {
    // element with the larger lineTime should go first
    const lineTimeDiff = b.lineTime - a.lineTime;

    if (Number.isNaN(lineTimeDiff)) {
      // if only one element has a lineTime, it should go first
      if (a.lineTime) {
        return -1;
      }

      if (b.lineTime) {
        return 1;
      }

      // if neither has lineTime, element with the larger corridorTime should go first
      return b.corridorTime - a.corridorTime;
    }

    return lineTimeDiff;
  });

  return (
    <section className="wrapper">
      <table className="times-table">
        <thead>
          <tr>
            <th className="table-cell--left">Athlete</th>
            <th className="table-cell--right">Finish line time</th>
          </tr>
        </thead>
        <tbody>
          {
            sortedTimes.map(time => (
              <tr key={time.code} className={time.lineTime ? '' : 'times-row--unfinished'}>
                <td className="table-cell--left">{`${time.startNumber}. ${time.name}`}</td>
                <td className="table-cell--right">
                  {
                    time.lineTime ? moment(time.lineTime).format('HH:mm:ss.S') : ''
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </section>
  );
}

TimesTable.propTypes = {
  times: PropTypes.arrayOf(PropTypes.object).isRequired,
};
