export const FOO = 'FOO';

export const getAllProducts = () => (dispatch, getState) => {
  // Here you would normally get the data from the server. We're simulating
  // that by dispatching an async action (that you would dispatch when you
  // succesfully got the data back)

  // You could reformat the data in the right format as well:

  dispatch({
    type: FOO,
    bar: 'baz'
  });
};
