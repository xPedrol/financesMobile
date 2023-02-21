import {AxiosResponse} from "axios";
import axiosClient from "../config/httpRequest.config";
import {ITag} from "../models/Tag.model";

export const apiTags = async (params?: any): Promise<AxiosResponse<ITag[]>> => {
    return axiosClient.get<ITag[]>(`/tags`, {params});
};

export const apiTag = async (
    id: string
): Promise<AxiosResponse<ITag>> => {
    return axiosClient.get<ITag>(`/tags/${id}`);
};

export const apiCreateTag = async (
    expense: ITag
): Promise<AxiosResponse<ITag>> => {
    return axiosClient.post<ITag>(`/tags/create`, expense);
};

export const apiUpdateTag = async (
    id: string,
    expense: ITag
): Promise<AxiosResponse<ITag>> => {
    return axiosClient.put<ITag>(`/tags/${id}`, expense);
};

export const apiDeleteTag = async (
    id: string
): Promise<AxiosResponse<ITag>> => {
    return axiosClient.delete<ITag>(`/tags/${id}`);
};

export const apiTagCount = async (
    params?: any
): Promise<AxiosResponse<number>> => {
    return axiosClient.get<number>(`/tags/count`, {params});
};