import axios from "axios";

export const apiMixin = {
        getToken() {
            return sessionStorage.getItem('authtoken')
        },
        getHeader() {
            const token = this.getToken()
            if(token){
                return { Authorization: `Bearer ${token}`}
            }
        },
         async getWithAuth(url) {
                const headers = this.getHeader()
                if(headers.Authorization){
                    try {
                        const res = await axios.get(url, {headers})
                        return res.data
                    } catch (error) {
                        console.log(error)
                        return error.response
                    }
                }
        },
         async postWithAuth(url, data) {
            const headers = this.getHeader()
                if(headers.Authorization) {
                    try {
                        const res = await axios.post(url, data, {headers})
                        return res.data
                    } catch (error) {
                        console.log(error)
                        return error.response
                    }
                }
        },
         async putWithAuth(url, data) {
            const headers = this.getHeader()
                if(headers.Authorization) {
                    try {
                        const res = await axios.put(url, data, {headers})
                        return res
                    } catch (error) {
                        console.log(error)
                        return error.response
                    }
                }
        },
         async getWithoutAuth(url) {
            try {
                const res = await axios.get(url)
                return res.data
            } catch (error) {
                console.log(error)
                return error.response
            }
        },
         async postWithoutAuth(url, data){
            try {
                const res = await axios.post(url, data)
                return res.data
            } catch (error) {
                console.log(error)
                return error.response
            }
        }
};

export default apiMixin