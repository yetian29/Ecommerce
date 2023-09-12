import { REMOVE_ALERT, SET_ALERT } from "./type"


const setAlert = (msg, alertType, timeout=5000) => dispatch => {

    dispatch({
        type: SET_ALERT,
        payload: {msg, alertType}
    });

    setTimeout(() => dispatch({
        type: REMOVE_ALERT
    }), timeout)
}

export default setAlert;