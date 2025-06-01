import system from './basics/system';
import storage from './basics/storage';
import api from './basics/api';
import networking from './basics/networking';

const basics = {
  "System Design": {
    ...system
  },
  "API": {
    ...api
  },
  "Data Storage": {
    ...storage
   },
  "Networking": {
    ...networking
   }
};

export default basics;
