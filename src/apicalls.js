import { api } from "./axios";

export const apicall = {
    result: async function (data) {
        const resData = await api.request({
            url: `/generate`,
            method: "POST",
            data: data,
        });
        if (resData && resData.data && !resData.error) {
            return resData;
        } else {
            return resData.error;
        }
    },

}