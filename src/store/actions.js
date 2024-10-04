import apiMixin from "@/Mixins/MixinAPI"
import { axiosMember } from "@/servives/axiosClient"

import axios from "axios"
// import Cookies from "js-cookie"
// export const fetchEmployee = async ({commit}) => {
//     try {
//         const res = await axiosClient.get(`/employee`)
//         commit('setEmployee', res.data)
//     } catch (error) {
//         console.log(error)
//     }
// }
// export const addEmployee = async ({commit}, employee) => {
//     try {
//         const res = await axiosClient.post(`/employee/create`, employee)
//         commit('setEmployee', res.data)
//     } catch (error) {
//         console.log(error)
//     }
// }
// export const updateEmploy = async ( employee) => {
//     try {
//         const res = await axiosClient.put(`/employee/update/${employee.id}`, employee)
//         return res.data
//     } catch (error) {
//         console.log(error)   
//     }
// }
// export const fetchEmployeeId = async ( id) => {
//     try {
//         const res = await axiosClient.get(`/employee/${id}`)
//         return res.data
//     } catch (error) {
//         console.log(error)
//     }
// }
// export const setSelectedEmployees = async ({commit}, employee) => {
//     commit('setSelectedEmployee', employee)
// }
// export const deleteEmployee = async ({commit}, id) => {
//     try {
//         const res = await axiosClient.delete(`/delete/${id}`)
//         commit('deleteEmployee', res.data.id)
//     } catch (error) {
//         console.log(error)
//     }
// }

// // member

export const registerMember = async ({commit}, member) => {
    try {
        const res = await axios.post('/auth/member/register', member)
        commit('setMember', res.data)
        return res
    } catch (error) {
        console.log(error)
        return error.response
    }
    // const data = await apiMixin.postWithoutAuth('/auth/member/register', member)
    // commit('setMember', data.data)
    // return data
}
export const loginMember = async ({commit}, member) => {
    try {
        const res = await axios.post('/auth/member/login', member)
       if(res.data.responseCode === 0){
        const token = res.data.data.accessToken
        commit('setToken', token)
       }
        return res
    } catch (error) {
        console.log(error)
        return error.response
    }
    // const data = await apiMixin.postWithoutAuth('/auth/member/login', member)
    // console.log(data)
    // if(data.responseCode === 0){
    //     const token = data.data.accessToken
    //     commit('setToken', token) 
    // }   
    // return data.data
}
export const fetchInfoMember = async ({commit}) => {
    // try {
    //     const token = sessionStorage.getItem('authtoken')
    //     if(token){
    //         const res = await axios.get('/member/info', {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             },
    //         })
    //         commit('setMember', res.data.data)
    //         return res.data
    //     }
    // } catch (error) {
    //     console.log(error)
    //     return error.response
    // }
    const data = await apiMixin.getWithAuth("/member/info");
    if(data){
        commit('setMember', data.data);
     return data;
    }
}
export const editInfo = async ({dispatch}, member) => {
    // try {   
    //     const token = sessionStorage.getItem('authtoken')
    //     if(token){
    //         const res = await axios.put('/member/editInfo', member, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         })
    //       await  dispatch('fetchInfoMember')
    //       return res.data
    //     }
        
    // } catch (error) {
    //     console.log(error)
    //     return error.response

    // }
    const data = await apiMixin.putWithAuth('/member/editInfo', member)
    console.log(data)
    if(data){
        await  dispatch('fetchInfoMember')
          return data.data
    }
}
export const sendMailOTP = async ({commit}, email) => {
    try {
        const res = await axios.post(`/otp/email/sendOTP?email=${email}`)
        commit('setStatus', res.data)
        return res
    } catch (error) {
        console.log(error)
        return error.response

    }
    // const data = await apiMixin.postWithoutAuth(`/otp/email/sendOTP?email=${email}`)
    // commit('setStatus', data.data)
    // return data.data
}
export const verifyEmail = async ({commit}, {email,otp}) => {
    // try {
    //     const res = await axios.post('/otp/verifyOTP', null, {
    //         params: {   
    //             email: email,
    //             otp: otp
    //         }
    //     })
    //     commit('updateMember', res.data)
    //     return res.data
    // } catch (error) {
    //     console.log(error)
    //     return error.response
    // }
    const data = await apiMixin.postWithoutAuth(`/otp/verifyOTP?email=${email}&otp=${otp}`)
    if(data){
        commit('updateMember', data.data)
    return data
    }
    
} 
export const verifyOTPPassword = async ({commit}, {email,otp}) => {
    // try {
    //     const res = await axios.post('/otp/email/verifyOTPForgotPassword', null, {
    //         params: {   
    //             email: email,
    //             otp: otp
    //         }
    //     })
    //     commit('updateMember', res.data)
    //     return res.data
    // } catch (error) {
    //     console.log(error)
    //     return error.response

    // }
    const data = await apiMixin.postWithoutAuth(`/otp/email/verifyOTPForgotPassword?email=${email}&otp=${otp}`)
    if(data){
        commit('updateMember', data.data)
        return data
    }
} 
export const editEmail = async ({dispatch}, email) => {
    try {
        const token = sessionStorage.getItem('authtoken')
        if(token) {
             const res = await axios.put('/member/editEmail', email, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        await dispatch('fetchInfoMember')
        return res.data
        }   
    } catch (error) {
        console.log(error)
        return error.response

    }
}
export const fogotpassword = async  ({commit}, {email, resetPassword, newPassword}) => {
    try {
        const res = await axiosMember.post('/auth/member/forgot-password', {email, resetPassword, newPassword},)
        commit('updateMember', res.data)
        return res.data
    } catch (error) {
        console.log(error)
        return error.response

    }
}
export const editPassword = async ({commit}, {oldPassword, newPassword, confirmPassword}) => {
    try {
        const token = sessionStorage.getItem('authtoken')
        if(token) {
             const res = await axios.put('/member/editPassword', {oldPassword, newPassword, confirmPassword}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
             })
        commit('updateMember', res.data)
        return res
        }
    } catch (error) {
        console.log(error)
        return error.response
    }
    // const data = await apiMixin.putWithAuth(`/member/editPassword`, {oldPassword, newPassword, confirmPassword})
    // console.log(data)
    // if(data){
    //     commit('updateMember', data)
    //     return data
    // }
}
export const fetchMemberMemberShip = async ({commit}) => {
    // try {
    //     const token = sessionStorage.getItem('authtoken')
    //     if(token){
    //         const res = await axios.get('/member/getMembership', {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         })
    //         commit('setMemberMemberShip', res.data.data)
    //         return res
    //     }
    // } catch (error) {
    //     console.log(error)
    // }
    const data = await apiMixin.getWithAuth('/member/getMembership')
    if(data){
        commit('setMemberMemberShip', data.data)
            return data.data
    }
}
export const fetchTransaction = async ({commit}, {page, size}) => {
    try {
        const token = sessionStorage.getItem('authtoken')
        if(token){
             const res = await axios.get(`/member/getTransactionList?page=${page}&size=${size}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
             })
        commit('setTransaction',res.data.data)
        return res.data.data
        }
    } catch (error) {
        console.log(error)
    }
}
export const fetchBookLoan  = async ({commit}, {page, size}) => {
    // try {
    //     const token = sessionStorage.getItem('authtoken')
    //     if(token){
    //         const res = await axios.get(`/member/getBookLoan?page=${page}&size=${size}`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         })
    //         console.log(res.data.data)
    //         commit('setBookLoan', res.data.data)
    //         return res.data
    //     }
    // } catch (error) {
    //     console.log(error)
    // }
    const data = await apiMixin.getWithAuth(`/member/getBookLoan?page=${page}&size=${size}`)
    if(data){
        commit('setBookLoan', data.data)
        return data.data
    }
}
export const fetchMemberShip = async ({commit}) => {
    try {
        const token = sessionStorage.getItem('authtoken')
        if(token){
            const res = await axiosMember.get('/membership/all', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            commit('setMemberShip', res.data.data)
            return res
        }
    } catch (error) {
        console.log(error)
        return error.response
    }
    //  const data = await apiMixin.getWithAuth("/membership/all");
    //  if(data.responseCode === 0){
    //     commit('setMemberShip', data.data);
    //  return data.data;
    //  }
     
}
export const fetchMemberShipId = async ({commit}, memberShipId) => {
    try {
        const token = sessionStorage.getItem('authtoken')
        if(token){
            const res = await axiosMember.get(`/membership/getMembership?membershipId=${memberShipId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            commit('setMemberShipId', res.data.data)
            return res.data.data
        }
    } catch (error) {
        console.log(error)
        return error.response
    }
    // const data = await apiMixin.getWithAuth(`/membership/getMembership?membershipId=${memberShipId}`);
    //  commit('setMemberShipId', data.data);
    //  return data.data;
}
export const fetchBook = async ({commit}, {page, size}) => {
    // try {
    //     const res = await axios.get(`/book/all?page=${page}&size=${size}`)
    //     commit('setBook', res.data)
    //     return res.data.data
    // } catch (error) {
    //     console.log(error)
    // }
     const data = await apiMixin.getWithoutAuth(`/book/all?page=${page}&size=${size}`);
     if(data){
         commit('setBook', data);
     return data;
     }
    
}
export const fetchBookId = async ({commit}, bookId) => {
    // try {
    //     const res = await axios.get(`/book/getBook?id=${bookId}`)
    //     commit('setBookId', res.data.data)
    //     return res.data.data
    // } catch (error) {
    //     console.log(error)
    // }
     const data = await apiMixin.getWithoutAuth(`/book/getBook?id=${bookId}`);
     if(data){
         commit('setBookId', data.data);
     return data.data;
     }
    
}
export const searchBooks = async ({commit}, {keyword, page, size}) => {
    try {
        const res = await axios.get(`/book/search?keyword=${keyword}&page=${page}&size=${size}`)
        commit('setSearchBook', res.data)
        return res.data
    } catch (error) {
        console.log(error)   
    }
    // const data = await apiMixin.getWithoutAuth(`/book/search?keyword=${keyword}&page=${page}&size=${size}`)
    // if(data){
    //       commit('setSearchBook', data.data)
    //     return data.data
    // }
}

export const fetchEbook = async ({commit}, bookId) => {
    // try {
    //     const res = await axios.get(`/book/sample/ebook?bookId=${bookId}`)
    //     commit('setbook', res.data)
    //     return res.data
    // } catch (error) {
    //     console.log(error)
    // }
    const data = await apiMixin.getWithoutAuth(`/book/sample/ebook?bookId=${bookId}`)
    console.log(data)
    if(data){
        commit('setbook', data.data)
        return data.data
    }
}
export const fetchAudio = async ({commit}, bookId) => {
    try {
        const res = await axios.get(`/book/audio?bookId=${bookId}`)
        commit('setBookId', res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const fetchVNP = async ({commit}, memberShipId) => {
    try {
        const token = sessionStorage.getItem('authtoken')
        if(token){
            const res = await axiosMember.get(`/transaction/vnpay/submitOrder?membershipId=${memberShipId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        commit('setMemberShipId', res.data.data)
        return res.data.data
        }
    } catch (error) {
        console.log(error)
    }
}
export const fetchQR = async ({commit}, memberShipId) => {
    try {
        const token = sessionStorage.getItem('authtoken')
        if(token){
            const res = await axiosMember.get(`/transaction/qr/create?membershipId=${memberShipId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }   
        })
        commit('setMemberShipId', res.data.data)
        return res.data.data
        }
    } catch (error) {
        console.log(error)
    }
}

export const fetchTag = async ({commit}) => {
    try {
        const res = await axiosMember.get(`/tag/all`)
        commit('setTag', res.data.data)
        return res.data.data
    } catch (error) {
        console.log(error)
    }
}
export const fetchTagAllbook = async ({commit}, {id, page, size}) => {
    try {
        const res = await axiosMember.get(`/tag/allBooks?tagId=${id}&page=${page}&size=${size}`)
        commit('setTagId', res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const searchTagBooks = async ({commit}, {keyword, id, page, size}) => {
    try {
        const res = await axios.get(`/tag/searchBooks?keyword=${keyword}&tagId=${id}&page=${page}&size=${size}`)
        commit('setSearchTagBook', res.data)
        return res.data
    } catch (error) {
        console.log(error)   
    }
    // const data = await apiMixin.getWithoutAuth(`/book/search?keyword=${keyword}&page=${page}&size=${size}`)
    // if(data){
    //       commit('setSearchBook', data.data)
    //     return data.data
    // }
}
export const openAuthModal = async ({commit}) => {
    commit('SET_AUTH_MODAL', true);
}
export const closeAuthModal = async ({commit}) => {
    commit('SET_AUTH_MODAL', false);
}
// Admin

