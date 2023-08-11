import { api } from "./axios";

export const apicall = {
    result: async function (data) {
        const resData = await api.request({
            url: `/generate`,
            method: "POST",
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' 
            },
            data: data,
        });
        if (resData && resData.data && !resData.error) {
            return resData;
        } else {
            return resData.error;
        }
    },

}