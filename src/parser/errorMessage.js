/**
 * Format error message
 * @param  {object} error [description]
 * @return {string}       [description]
 */
export default error => {
  const line = error.location && error.location.start
    ? `Line: ${error.location.start.line} Column: ${error.location.start.column}`
    : '';
  return `Parsing pattern error
    ${error.message}
    ${line}
  `;
};
