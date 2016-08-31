import { connect } from 'react-redux';
import { getShipmentData } from '../modules/PopUpCard';
import PopUpCard from '../components/PopUpCard';

const mapActionCreators = {
  getShipmentData,
};

const mapStateToProps = (state) => ({
  dbdata: state.shipmentData,
});

export default connect(mapStateToProps, mapActionCreators)(PopUpCard);
