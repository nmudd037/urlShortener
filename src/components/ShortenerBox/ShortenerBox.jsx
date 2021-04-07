import PropTypes from 'prop-types';

const ShortenerBox = ({ link = '', onClick }) => {
  return (
    <div className="columns">
      <div className="column is-full has-text-centered mt-3_5">
        <div className="notification is-primary is-light">
          <button className="delete" onClick={onClick}></button>
          <span>
            <i className="fad fa-cut"></i>
          </span>
          <strong> Your Shortened Link: </strong>
          <a href={link} target="_blank" rel="noopener noreferrer">
            {link}
          </a>
        </div>
      </div>
    </div>
  );
};

ShortenerBox.propTypes = {
  link: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ShortenerBox;
