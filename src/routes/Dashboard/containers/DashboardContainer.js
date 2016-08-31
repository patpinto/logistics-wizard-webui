import { connect } from 'react-redux';
import { getAdminData } from '../modules/Dashboard';
import Dashboard from '../components/Dashboard';

const mapActionCreators = {
  getAdminData,
};

const mapStateToProps = (state) => ({
  demoName: state.demoSession.name || undefined,
  shipments: state.dashboard.shipments || undefined,
});

export default connect(mapStateToProps, mapActionCreators)(Dashboard);
