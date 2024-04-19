import axios from "axios";

const API = "http://localhost:5000/";

export const signup = async (name, email, password, age, location, position, department ) => {
    try {
        const data = await axios.post(API+'signup', { name, email, password, age, location, position, department});
        if (data){
            return data.data;
        }
        else{
            return null
        }
    } catch (error) {
        console.log(error);
    }
}

export const verifyotp = async (email ) => {
    try {
        const data = await axios.post(API+'otp', { email});
        if (data){
            return data;
        }
        else{
            return null
        }
    } catch (error) {
        console.log(error);
    }
}

export const login = async (email, password ) => {
    try {
        const data = await axios.post(API+'login', {email, password});
        if (data.data){
            
            return data.data;
        }
        else{
            return null
        }
    } catch (error) {
        console.log(error);
    }
}
