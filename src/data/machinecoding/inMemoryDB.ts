import keyValueImplementation from './keyValue/implementation';
import documentBasedImplementation from './documentBased/implementation';

const inMemoryDB = {
  "Key-Value Store": {
    ...keyValueImplementation
  },
  "Document Store": {
    ...documentBasedImplementation
  }
};

export default inMemoryDB;
