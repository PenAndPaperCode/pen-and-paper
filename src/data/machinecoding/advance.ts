import rateLimiter from './advance/rateLimiter';
import inMemoryDB from './advance/inMemoryDB';

const advance = {
  "Rate Limiter": {
    ...rateLimiter
  },
  "In-Memory Database": {
    ...inMemoryDB
  }
};

export default advance;
