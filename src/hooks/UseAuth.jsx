import  { useContext } from 'react';
import { AuthContext } from '../Firebase/Firebase-provider';


const UseAuth = () => {
    const all = useContext(AuthContext)
    return all
};

export default UseAuth;