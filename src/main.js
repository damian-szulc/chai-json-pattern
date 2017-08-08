import init, { extend, chaiJsonPattern } from './chaiJsonPattern';
import basePlugin from './plugins/base';

export default init(basePlugin());

export { chaiJsonPattern, extend };
