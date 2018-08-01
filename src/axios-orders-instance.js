import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'https://react-burger-apps.firebaseio.com/'
});

export default instance;