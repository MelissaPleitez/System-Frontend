import authApi from "../libs/axios";


export const getApplication = async  () =>{

  const res= await authApi.get('/application')
  return res.data
}

export const getAllApplication = async  () =>{

    const res= await authApi.get('/application/all')
    return res.data
  }

export const createApplication= (application:any)=>{
    authApi.post('/application', application)
}



 