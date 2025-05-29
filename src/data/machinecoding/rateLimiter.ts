import tokenBucketAlgorithm from './tokenBucket/algorithm';
import leakyBucketAlgorithm from './leakyBucket/algorithm';

const rateLimiter = {
  "Token Bucket": {
    ...tokenBucketAlgorithm
  },
  "Leaky Bucket": {
    ...leakyBucketAlgorithm
  }
};

export default rateLimiter;
