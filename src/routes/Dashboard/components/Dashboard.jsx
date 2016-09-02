import React from 'react';
import classes from './Dashboard.scss';
import PopUpCard from './PopUpCard';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const items = [];

let loadedShipments = false;

export default class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      'shipmentID': '..loading',
      'filteredShipment': {}
    }
    props.getAdminData(props.params.guid);
    props.getShipmentData();
  }
  componentWillReceiveProps = () => {
    if (!loadedShipments && this.props.shipments && this.props.shipments[0]) {
      this.search(this.props.shipments[0].id)
      for (let i = 0; i < this.props.shipments.length; i++ ) {
        var key = this.props.shipments[i].id;
        items.push(<MenuItem value={key} key={key} primaryText={`Shipment ${key}`} />);
        loadedShipments = true;
      }
    }
  }

  search = (id) => {
    this.setState({ shipmentID: id });
    const filteredShipment = this.props.shipments.filter(entry => entry.id === parseInt(id, 10));
    this.setState({ filteredShipment: filteredShipment[0] })
  }

  handleChange = (event, index, value) => {
    this.search(value)
  }

  render() {
    const shipment = this.state.filteredShipment ? this.state.filteredShipment : {};
    return (
      <div className={classes.dashboard}>
        <h4>Demo Name: {this.props.demoName || '...'}</h4>
        Get Shipment Details: &nbsp;
        <SelectField value={this.state.shipmentID} onChange={this.handleChange}>
          {items}
        </SelectField>
        <PopUpCard
          location={shipment.currentLocation || {}}
          title={shipment.id ? shipment.id.toString() : '...'}
          status={shipment.status || '...'}
        />
      <pre>
      </pre>
      </div>
    );
  }
}


Dashboard.propTypes = {
  demoName: React.PropTypes.string,
  shipments: React.PropTypes.array,
  getAdminData: React.PropTypes.func.isRequired,
  getShipmentData: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
};
