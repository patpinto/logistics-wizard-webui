import { injectReducer } from 'store/reducers';
import { injectSagas } from 'store/sagas';

export default (store) => ({
  path: 'popupcard/:guid',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const PopUpCard = require('./containers/PopUpCardContainer').default;
      const reducer = require('./modules/PopUpCard').default;
      const sagas = require('./modules/PopUpCard').sagas;

      injectReducer(store, { key: 'popupcard', reducer });
      injectSagas(store, { key: 'popupcard', sagas });

      cb(null, PopUpCard);
    }, 'popupcard');
  },
});
