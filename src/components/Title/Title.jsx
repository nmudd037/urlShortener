import PropTypes from 'prop-types';

const Title = ({ title }) => {
  return (
    <div className="columns">
      <div className="column is-full">
        <h1 className="title is-1">{title}</h1>
        <hr className="content-divider" />
      </div>
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
