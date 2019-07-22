import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: propTypes.array.isRequired
};

// Mapping redux state into a function
const mapStateToProps = state => ({
  alerts: state.alert
});

// connect(mapStateToProps, action)
export default connect(mapStateToProps)(Alert);
