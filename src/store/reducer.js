import { SET_TEMPERATURE_CELSIUS ,SET_TEMPERATURE_FARHEINHEIT } from './action';


function reducer(state , action) {
  console.log({action,state});
  switch (action.type) {
    case SET_TEMPERATURE_CELSIUS:
      return {
        ...state , temperatureVaLueCelcius : action.temperatureVaLueCelcius 
      };
    case SET_TEMPERATURE_FARHEINHEIT: 
      return {
        ...state , temperatureVaLueFarhenheit : action.temperatureVaLueFarhenheit 
      }
    default:
      return state;
  }
}

export default reducer;