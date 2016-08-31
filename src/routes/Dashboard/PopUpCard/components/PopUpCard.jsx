import api from 'services';
import React from 'react';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import classes from './PopUpCard.scss';


const styles = {
  paper: {
    height: 300,
    width: 250,
    margin: 20,
    overflow: 'scroll',
  },
};


export default class PopUpCard extends React.Component {
  constructor(props) {
    super(props);
    props.getShipmentData(props.params.guid);
    // this.state = {
    //   title: `Shipment ${this.props.id}`,
    // };
    // const reactThis = this;
    // api.getShipment(this.props.id).then(result => {
    //   reactThis.setState({ result });
    // });
  }

  render() {
    const location = this.props.dbdata ?
      `${this.props.dbdata.currentLocation.city}, ${this.props.dbdata.currentLocation.state}` :
      '...';
    return (
      <Paper style={styles.paper} zDepth={2}>
        <Toolbar>
          <ToolbarTitle text={this.props.dbdata.title ? this.props.title : '...'} />
        </Toolbar>
        <div className={classes.mainSection}>
          <pre>
            Status: { this.props.dbdata ? this.props.dbdata.status : 'loading...'}{"\n"}
            Location: {location}
          </pre>
        </div>
      </Paper>
    );
  }
}

PopUpCard.propTypes = {
  dbdata: React.PropTypes.object.isRequired,
  getShipmentData: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
};
