import keyValue from './inMemoryDB/keyValue';
import documentBased from './inMemoryDB/documentBased';

const inMemoryDB = {
  "Key-Value Store": {
    ...keyValue
  },
  "Document Store": {
    ...documentBased
  }
};

export default inMemoryDB;
