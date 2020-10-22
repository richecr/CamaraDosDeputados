import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const CardFooterItem = ({ label, icon, tooltip }) => {
  return (
    <div
      className="card-footer-item__container"
      data-tip={tooltip}
      data-tooltip="Tooltip Text"
    >
      {icon}
      {label}
    </div>
  );
};

CardFooterItem.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  tooltip: PropTypes.string.isRequired,
};

export default CardFooterItem;
