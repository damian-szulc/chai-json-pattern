'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var manager = {
  extenstions: {},

  /**
   * Extend of new validation fnc
   * @param {object} plugin
   */
  extend: function extend(plugin) {
    // @TODO
    if ((typeof plugin === 'undefined' ? 'undefined' : _typeof(plugin)) !== 'object') {
      throw new Error('ChaiJsonPattern: suplied wrong validators');
    }

    manager.extenstions = _extends({}, manager.extenstions, plugin);
  },


  /**
   * Get validator by its name
   * @param {string} name
   * @return {function} validator fnc
   */
  get: function get(name) {
    if (!name || typeof name !== 'string') {
      throw new Error('ChaiJsonPattern: Wrong validator name: \'' + name + '\'');
    }
    var validator = manager.extenstions[name];
    if (!validator) {
      throw new Error('ChaiJsonPattern: Validator \'' + name + '\' not found');
    }
    return validator;
  }
};

exports.default = manager;