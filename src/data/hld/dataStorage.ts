import sqlNoSql from './dataStorage/sqlNoSql';
import indexing from './dataStorage/indexing';

const dataStorage = {
  "SQL vs NoSQL": {
    ...sqlNoSql
  },
  "Database Indexing": {
    ...indexing
  }
};

export default dataStorage;
