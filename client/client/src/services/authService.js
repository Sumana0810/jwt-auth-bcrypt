import api from "./api"

export const login=async(Cred)=>{
    //cred={email,password}

    const res=await api.post("api/login",Cred);
    return res.data;
}

export const register=async(Cred)=>{
    const res=await api.post("api/register",Cred)
    return res.data;
}

