import React from 'react';
import classes from './Dashboard.scss';
import PopUpCard from '';


export default class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    props.getAdminData(props.params.guid);
  }

  render() {
    return (
      <div className={classes.dashboard}>
        <h4>Dashboard - Yay, you created a demo!</h4>
        <p>Demo Name: {this.props.demoName || 'loading...'}</p>
        <PopUpCard
          shipmentId={470}
          dbdata={this.props.dbdata}
          params={this.props.params}
        />
        <pre>{this.props.dbdata ? JSON.stringify(this.props.dbdata, null, 2) : 'loading...'}</pre>
      </div>
    );
  }
}


Dashboard.propTypes = {
  nextShipment:
  demoName: React.PropTypes.string.isRequired,
  dbdata: React.PropTypes.object.isRequired,
  getAdminData: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
};
