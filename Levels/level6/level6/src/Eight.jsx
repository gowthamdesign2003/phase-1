import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      return {
        name: state.name,
        age: state.age + 1
      };
    }
    case 'decremented_age': {
      return {
        name: state.name,
        age: state.age - 1
        };
    }
  }
  throw Error('Unknown action: ' + action.type);
}

const initialState = { name: 'Taylor', age: 42 };

export default function Form() {
  const [state, dispatch] = useReducer(reducer, initialState);
  

  function handleButtonClick() {
    dispatch({ type: 'incremented_age' });
  }
  function handleButton() {
    dispatch({ type: 'decremented_age' });
  }

  

  return (
    <>
      <button onClick={handleButtonClick}>
        Increment age
      </button>
      <button onClick={handleButton}>
        decrement age
      </button>
      <p>You are {state.age}.</p>
    </>
  );
}
