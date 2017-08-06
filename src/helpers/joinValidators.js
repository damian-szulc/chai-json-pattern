import {
  LIKE,
  COMMAND,
  COMMAND_ARGS,
  OR,
  AND,

} from '../constants';

const service = {
  /**
   * Join command arguments
   * @param  {array|null} args [description]
   * @return {string}           [description]
   */
  joinCommandArgs(args) {
    if (!args) {
      return '';
    }
    const joinedArgs = args.map(arg => JSON.stringify(arg)).join(', ');
    return `(${joinedArgs})`;
  },

  /**
   * Join command to string
   * @param  {object} validator [description]
   * @return {string}           [description]
   */
  joinCommand(validator) {
    const validatorArgs = service.joinCommandArgs(validator[COMMAND_ARGS]);
    return `${validator[COMMAND]}${validatorArgs}`;
  },

  /**
   * Join array of commands
   * @param  {array} commands [description]
   * @param  {string} joiner   [description]
   * @param  {number} depth    [description]
   * @return {string}          [description]
   */
  joinArray(commands, joiner, depth) {
    const joined = commands
      .reverse()
      .map(command => service.join(command, depth + 1))
      .join(` ${joiner} `);

    if (depth > 0) {
      return `( ${joined} )`;
    }
    return joined;
  },

  /**
   * Join expected commands
   * @param  {Object} [validator={}] [description]
   * @param  {Number} [depth=0]      depth of command join
   * @return {string}                [description]
   */
  join(validator = {}, depth = 0) {
    if (validator[COMMAND]) {
      return service.joinCommand(validator);
    }

    if (validator[OR]) {
      return service.joinArray(validator[OR], 'OR', depth);
    }

    if (validator[AND]) {
      return service.joinArray(validator[AND], 'AND', depth);
    }
  },

};

export default service.join;
