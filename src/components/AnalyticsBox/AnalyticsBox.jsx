import PropTypes from 'prop-types';

const AnalyticsBox = ({ timestamp, visitors, onClick }) => {
  return (
    <div className="columns" id="analyticsBox">
      <div className="column is-full mt-3_5">
        <div className="notification is-danger is-light">
          <button className="delete" onClick={onClick}></button>
          <div className="columns is-vcentered">
            <div className="column has-text-centered">
              <span className="ifs-8">
                <i className="fad fa-analytics"></i>
                {'  '}
              </span>
              <strong className="fs-2"> Analytics for your Shortened Link: </strong>
            </div>
          </div>
          <div className="columns is-vcentered is-multiline">
            <div className="column is-full has-text-centered">
              Total number of Visitors from <strong>{timestamp}:</strong>
            </div>
            <div className="column  has-text-centered">
              <i className="fad fa-users fs-3"></i>
              <span className="fs-3">
                {'  '}
                {visitors}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AnalyticsBox.propTypes = {
  timestamp: PropTypes.string.isRequired,
  visitors: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AnalyticsBox;
