import techniques from './loadBalancing/techniques';
import horizontalVertical from './scaling/horizontalVertical';

const scalability = {
  "Load Balancing": {
    ...techniques
  },
  "Scaling Strategies": {
    ...horizontalVertical
  }
};

export default scalability;
