import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ title, style, onClick }) => {
    return (
        <button style={style} onClick={onClick}>
            {title}
        </button>
    );
};

Button.propTypes = {
    style: PropTypes.object,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};

export default Button;