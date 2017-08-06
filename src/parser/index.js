import pegjs from './pegjs';
import errorMessage from './errorMessage';
/**
 * Parser delivered json-pattern
 * @param  {string} expected [description]
 * @return {object}          [description]
 */
const parser = expected => {
  let parsed;
  let error;

  try {
    parsed = pegjs.parse(expected);
  } catch (e) {
    error = errorMessage(e);
  }

  return { parsed, error };
};

export default parser;
