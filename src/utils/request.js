
import axios from 'axios';
const request = axios.create({
  timeout: 5000 // request timeout
})
export default request