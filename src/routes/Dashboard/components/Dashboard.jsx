import React from 'react';
import classes from './Dashboard.scss';
import PopUpCard from './PopUpCard';

export default class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    props.getAdminData(props.params.guid);
  }

  render() {
    const shipment = this.props.shipments ? this.props.shipments[0] : {};
    return (
      <div className={classes.dashboard}>
        <h4>Dashboard - Yay, you created a demo!</h4>
        <p>Demo Name: {this.props.demoName || 'loading...'}</p>
        <PopUpCard
          location={shipment.currentLocation}
          title={shipment.title}
          status={shipment.status}
        />
      </div>
    );
  }
}


Dashboard.propTypes = {
  demoName: React.PropTypes.string,
  shipments: React.PropTypes.array,
  getAdminData: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
};
