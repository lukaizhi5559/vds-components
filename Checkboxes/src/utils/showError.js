async function showError(evt, _this) {
  const { error } = _this.props;
  if (error == null) return; // will catch both null and undefined.
  let errorValue;

  // See if error prop is a function and invoke it
  if (typeof error === 'function') errorValue = await error(evt);
  else errorValue = error;

  // set error state based on error value
  if (typeof errorValue === 'boolean') _this.setState({ error: errorValue });
  else
    console.error(
      '"Error" prop should be a boolean or a function that returns a boolean value.'
    );
}

export default showError;
