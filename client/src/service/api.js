import axios from 'axios'
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../configuration/config'
import { getAccessToken, getType } from '../utils/common-utils'

const API_URL = 'http://localhost:4000'

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "content-type": "application/json",
    }
})

axiosInstance.interceptors.request.use(
    function (config) {
        if (config.TYPE.params) {
            config.params = config.TYPE.params
        } else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        return processResponse(response)
    },
    (error) => {
        return Promise.reject(processError(error))
    }
)

const processResponse = (response) => {
    if (response?.status === 200) {
        return {
            isSuccess: true,
            data: response.data
        }
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

const processError = (error) => {
    if (error.response) {
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }
    } else if (error.request) {
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ''
        }
    } else {
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ''
        }
    }
}

const API = {}

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) => {
        const headers = {
            "Content-Type": value.method === 'POST' && body instanceof FormData
                ? 'multipart/form-data'
                : 'application/json',
            "Authorization": getAccessToken()
        };
        return axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,
            responseType: value.responseType,
            headers: headers,
            TYPE: getType(value, body),
            onUploadProgress: (progress) => {
                if (showUploadProgress) {
                    const percentageCompleted = Math.round((progress.loaded * 100) / progress.total)
                    showUploadProgress(percentageCompleted)
                }
            },
            onDownloadProgress: (progress) => {
                if (showDownloadProgress) {
                    const percentageCompleted = Math.round((progress.loaded * 100) / progress.total)
                    showDownloadProgress(percentageCompleted)
                }
            },
        })
    }
}

export default API