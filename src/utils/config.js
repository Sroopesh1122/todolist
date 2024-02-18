export const  base_url="http://localhost:5000/api/"
// export const  base_url="https://simple-server-qlk4.onrender.com/api/"



export const getUserData=()=>{
    return JSON.parse(localStorage?.getItem('user'))
}

export const getAxiosConfig =(cancelToken)=>{
    const token=JSON.parse(localStorage?.getItem('user')).token
    const config={
        headers:{
            authorization:`Bearer ${token}`
        },
        cancelToken
    }
    return config
}