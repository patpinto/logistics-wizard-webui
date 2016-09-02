export const CONTROLLER_URL = __DEV__
  ? 'https://dev-logistics-wizard.mybluemix.net/api/v1'
  : 'https://logistics-wizard.mybluemix.net/api/v1';

export const ERP_URL = __DEV__
  ? 'https://dev-logistics-wizard-erp.mybluemix.net/api/v1'
  : 'https://logistics-wizard-erp.mybluemix.net/api/v1';


export const callApi = (endpoint, apiUrl, {
  headers = { 'Content-Type': 'application/json' },
  method = 'GET',
  body,
} = {}) => {
  // console.log("endpoint: ", endpoint);
  // console.log("HEADERS: ", headers);
  return fetch(`${apiUrl}/${endpoint}`, {
    headers,
    method,
    body: body ? JSON.stringify(body) : undefined,
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) throw json;
    return json;
  })
};

export const createDemo = (name, email) =>
  callApi('demos', CONTROLLER_URL, {
    method: 'POST',
    body: { name, email },
  });

export const getDemo = (guid) => callApi(`demos/${guid}`, CONTROLLER_URL);

export const login = (id, guid) =>
  callApi(`demos/${guid}/login`, CONTROLLER_URL, {
    method: 'POST',
    body: { userId: id },
  });

export const getAdminData = token =>
  callApi('admin', CONTROLLER_URL, { headers: { Authorization: `Bearer ${token}` } });

export const getShipmentData = (token) => callApi('shipments'
    , CONTROLLER_URL
    , { headers: { Authorization: `Bearer ${token}` } });
export const api = {
  createDemo,
  getDemo,
  login,
  getAdminData,
  getShipmentData,
};

export default api;
