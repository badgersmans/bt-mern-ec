import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ value, text, color }) => {
  return (
    <div className='rating'>
      {[1, 2, 3, 4, 5].map((index) => (
        <i
          style={{ color }}
          className={
            value >= index
              ? 'fas fa-star'
              : value >= index - 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
          //   {`value is? ${value} index is? ${index} `}
        ></i>
      ))}
      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: '#f9a825',
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Rating;
