import api from 'services';
import { call, take, put, select } from 'redux-saga/effects';
import { loginSuccess, receiveDemoSuccess, demoSelector } from 'modules/demos';

// ------------------------------------
// Constants
// ------------------------------------
export const GET_ADMIN_DATA = 'Dashboard/GET_ADMIN_DATA';
export const ADMIN_DATA_RECEIVED = 'Dashboard/ADMIN_DATA_RECEIVED';
export const GET_SHIPMENT_DATA = 'Dashboard/GET_SHIPMENT_DATA';
export const SHIPMENT_DATA_RECEIVED = 'Dashboard/SHIPMENT_DATA_RECEIVED';

// ------------------------------------
// Actions
// ------------------------------------
export const getAdminData = (value) => ({
  type: GET_ADMIN_DATA,
  payload: value,
});

export const adminDataReceived = (value) => ({
  type: ADMIN_DATA_RECEIVED,
  payload: value,
});

export const getShipmentData = () => ({
  type: GET_SHIPMENT_DATA,
  payload: '',
});

export const shipmentDataReceived = (value) => ({
  type: SHIPMENT_DATA_RECEIVED,
  payload: value,
});


export const actions = {
  getAdminData,
  adminDataReceived,
  getShipmentData,
  shipmentDataReceived,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADMIN_DATA_RECEIVED]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [SHIPMENT_DATA_RECEIVED]: (state, action) => ({
    ...state,
    shipments: [...action.payload],
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
};
export const dashboardReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};
export default dashboardReducer;

// ------------------------------------
// Sagas
// ------------------------------------
export const dashboardSelector = state => state.dashboard;

function *watchGetAdminData() {
  while (true) {
    const { payload } = yield take(GET_ADMIN_DATA);
    let demoState = yield select(demoSelector);
    if (demoState.guid !== payload) {
      try {
        const demoSession = yield call(api.getDemo, payload);
        yield put(receiveDemoSuccess(demoSession));
        demoState = yield select(demoSelector);
      }
      catch (error) {
        // console.log(error);
        // yield put(receiveDemoFailure(error));
      }

      try {
        const { token } = yield call(api.login, demoState.id, demoState.guid);
        yield put(loginSuccess(token));
        demoState = yield select(demoSelector);
      }
      catch (error) {
        // console.log(error);
        // yield put(loginFailure(error));
      }
    }

    try {
      const adminData = yield call(api.getAdminData, demoState.token);
      yield put(adminDataReceived(adminData));
    }
    catch (error) {
      // console.log(error);
      // yield put(getAdminDataFilure(error));
    }
  }
}

function *watchGetShipmentData() {
  while (true) {
    yield take(GET_SHIPMENT_DATA);
    yield take(ADMIN_DATA_RECEIVED);
    const demoState = yield select(demoSelector);
    try {
      const shipmentData = yield call(api.getShipmentData, demoState.token);
      yield put(shipmentDataReceived(shipmentData));
    }
    catch (error) {
      // console.log(error);
      // yield put(getShipmentDataFilure(error));
    }
  }
}

export const sagas = [
  watchGetAdminData,
  watchGetShipmentData,
];
