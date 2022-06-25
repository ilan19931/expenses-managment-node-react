import { uiActions } from "../redux/slices/ui.slice";
import { v4 as uuid } from "uuid";

export const setAlert = (dispatch, alert) => {
  const newAlert = {
    ...alert,
    id: uuid(),
  };

  dispatch(uiActions.showAlert(newAlert));

  setTimeout(() => {
    dispatch(uiActions.removeAlert(newAlert.id));
  }, 5000);
};
