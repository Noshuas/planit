import { exportAll } from 'lib/exportAll';
import * as events from './events';

// export all imports
exportAll([events], ([key, value]) => {
  module.exports[key] = value;
});
