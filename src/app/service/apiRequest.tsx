import { NextRequest } from "next/server";
import { ApiResponse } from "../types/pacalType";

async function getDataFromServer(url: string, method: string, data: {}){
    let errResponse:ApiResponse = {
        message_id: "10001",
        message: '请求出错',
        result: false,
        object: {}
    }
    const headers = 
    // headers['Accept'] = 'application/json';
    // headers['Content-Type'] = 'application/json';

    console.log('backend url', process.env.BACKEND_URL, url);
    try {
        let requestBody = {}
        if(method == 'POST') {
            requestBody = {
                method: method,
                headers: headers,
                body: JSON.stringify(data)
            }
        }else {
            requestBody = {
                method: method,
                headers: headers
            }
        }
        let response = await fetch(process.env.BACKEND_URL + url, requestBody);
        if(!response.ok) {
            console.log('api request was not ok 1', response.json())
            return errResponse;
        }
        return response.json()
    }catch(error) {
        console.log(url, 'api request was not ok 2', error)
    }
    return errResponse;
}

export async function postRequest(requestUrl:string, data: {}) {
    const apiResponse = await getDataFromServer(requestUrl, "POST", data);
    
    console.log(requestUrl, apiResponse)
    return apiResponse as ApiResponse
}

export async function getRequest( requestUrl:string) {
    const response = await getDataFromServer(requestUrl, "GET", {});

    console.log(requestUrl, response)
    return response as ApiResponse
}


