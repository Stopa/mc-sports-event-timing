import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './TimesTable.css';

export default function TimesTable(props) {
  const { times } = props;

  const sortedTimes = times.slice().sort((a, b) => {
    if (a.lineTime && b.lineTime) {
      // element with the larger lineTime should go first
      return moment(b.lineTime) - moment(a.lineTime);
    }

    // if only one element has a lineTime, it should go last
    if (a.lineTime) {
      return 1;
    }

    if (b.lineTime) {
      return -1;
    }

    // if neither has lineTime, element with the larger corridorTime should go first
    return moment(b.corridorTime) - moment(a.corridorTime);
  });

  return (
    <section className="wrapper">
      <table className="times-table">
        <thead>
          <tr>
            <th className="table-cell--left">Athlete</th>
            <th className="table-cell--right">Finish time</th>
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
