const initialWagonState = {
    supplies: 100,
    distance: 0,
    days: 0,
    cash: 200
  }
  
  const reducer = (state = initialWagonState, action) => {
    switch (action.type) {
      case 'gather': {
        return {
          ...state,
          supplies: state.supplies + 15,
          distance: state.distance,
          days: state.days + 1
        };
      }
      case 'travel': {
        const newSupplies = state.supplies - (20 * action.payload);
        if (newSupplies < 0) {
          return state;
        }
        return {
          ...state,
          supplies: newSupplies,
          distance: state.distance + (10 * action.payload),
          days: state.days + action.payload
        }
      }
      case 'tippedWagon': {
        return {
          ...state,
          supplies: state.supplies - 30,
          distance: state.distance,
          days: state.days + 1
        }
      }
      case 'sell': {
        if (state.supplies >= 20) {
          return {
            ...state,
            supplies: state.supplies - 20,
            cash: state.cash + 5
          };
        } else {
          return state;
        }
        }
      case 'buy': {
        if (state.cash >= 15) {
          return {
            ...state,
            supplies: state.supplies + 25,
            cash: state.cash - 15
          };
        } else {
          return state;
        }
        }
      case 'theft': {
        return {
          ...state, 
          cash: state.cash - (state.cash / 2)
        }
      }
      default: {
        return state;
      }
    }
  }
  
  let wagon = reducer(undefined, {} );
  console.log(wagon);
  
  wagon = reducer(wagon, {type: 'travel', payload: 1});
  console.log(wagon);
  
  wagon = reducer(wagon, {type: 'gather'});
  console.log(wagon);
  
  wagon = reducer(wagon, {type: 'tippedWagon'});
  console.log(wagon);
  
  wagon = reducer(wagon, {type: 'travel', payload: 3 });
  console.log(wagon);
  
  wagon = reducer(wagon, {type: 'travel', payload: 3 });
  console.log(wagon);
  
  wagon = reducer(wagon, {type: 'sell'});
  console.log(wagon);
  
  wagon = reducer(wagon, {type: 'buy'});
  console.log(wagon);
  
  wagon = reducer(wagon, {type: 'theft'});
  console.log(wagon);