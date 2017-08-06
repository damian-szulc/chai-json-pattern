import init, { addPlugin, chaiJsonPattern } from './chaiJsonPattern';
import lodashPlugin from './lodashPlugin';

export default init(lodashPlugin());

export { chaiJsonPattern, addPlugin };
