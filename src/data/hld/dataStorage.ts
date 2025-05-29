import comparison from './sqlNoSql/comparison';
import databaseIndexing from './indexing/databaseIndexing';

const dataStorage = {
  "SQL vs NoSQL": {
    ...comparison
  },
  "Database Indexing": {
    ...databaseIndexing
  }
};

export default dataStorage;
