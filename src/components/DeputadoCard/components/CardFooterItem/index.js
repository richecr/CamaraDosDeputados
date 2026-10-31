import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const CardFooterItem = ({ label, icon, title }) => {
  return (
    <div
      className="card-footer-item__container"
      title={title}
    >
      {icon}
      {label}
    </div>
  );
};

CardFooterItem.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
};

export default CardFooterItem;
