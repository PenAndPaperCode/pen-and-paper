import loadBalancing from './scalability/loadBalancing';
import scaling from './scalability/scaling';

const scalability = {
  "Load Balancing": {
    ...loadBalancing
  },
  "Scaling Strategies": {
    ...scaling
  }
};

export default scalability;
