const manager = () => {
  /**
   * Object with command matchers
   */
  let extenstions = {};

  return {
    /**
     * Extend of new validation fnc
     * @param {object} plugin
     */
    extend(plugin) {
      if (Object.prototype.toString.call(plugin) !== '[object Object]') {
        throw new Error('ChaiJsonPattern: suplied wrong validators');
      }

      extenstions = {
        ...extenstions,
        ...plugin,
      };
    },

    /**
     * Get validator by its name
     * @param {string} name
     * @return {function} validator fnc
     */
    get(name) {
      if (!name || typeof name !== 'string') {
        throw new Error(`ChaiJsonPattern: Wrong validator name: '${name}'`);
      }
      const validator = extenstions[name];
      if (!validator) {
        throw new Error(`ChaiJsonPattern: Validator '${name}' not found`);
      }
      return validator;
    },
  };  
};

export default manager();
