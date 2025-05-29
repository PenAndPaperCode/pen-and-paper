import tokenBucket from './rateLimiter/tokenBucket';
import leakyBucket from './rateLimiter/leakyBucket';

const rateLimiter = {
  "Token Bucket": {
    ...tokenBucket
  },
  "Leaky Bucket": {
    ...leakyBucket
  }
};

export default rateLimiter;
