import singleton from './creational/singleton';
import adapter from './structural/adapter';

const designPatterns = {
  "Creational": {
    ...singleton
  },
  "Structural": {
    ...adapter
  }
};

export default designPatterns;
