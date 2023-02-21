import {AxiosResponse} from "axios";
import axiosClient from "../config/httpRequest.config";
import {INote} from "../models/Note.model";

export const apiNotes = async (params?: any): Promise<AxiosResponse<INote[]>> => {
    return axiosClient.get<INote[]>(`/notes`, {params});
};

export const apiNote = async (
    id: string
): Promise<AxiosResponse<INote>> => {
    return axiosClient.get<INote>(`/notes/${id}`);
};

export const apiCreateNote = async (
    note: INote
): Promise<AxiosResponse<INote>> => {
    return axiosClient.post<INote>(`/notes/create`, note);
};

export const apiUpdateNote = async (
    id: string,
    note: INote
): Promise<AxiosResponse<INote>> => {
    return axiosClient.put<INote>(`/notes/${id}`, note);
};

export const apiDeleteNote = async (
    id: string
): Promise<AxiosResponse<INote>> => {
    return axiosClient.delete<INote>(`/notes/${id}`);
};
export const apiToggleFixed = async (
    id: string
): Promise<AxiosResponse<INote>> => {
    return axiosClient.put<INote>(`/notes/${id}/fixed`);
};

export const apiNotesCount = async (): Promise<AxiosResponse<number>> => {
    return axiosClient.get<number>(`/notes/count`);
};

export const apiAddToNoteGroup = async (
    id: string,
    noteGroupId: string
): Promise<AxiosResponse<INote>> => {
    return axiosClient.put<INote>(`/notes/${id}/group/${noteGroupId}`);
};
export const apiRemoveFromNoteGroup = async (
    id: string
): Promise<AxiosResponse<INote>> => {
    return axiosClient.get<INote>(`/notes/${id}/group/delete`);
};

export const apiSwitchNoteGroup = async (
    id: string,
    noteGroupId: string
): Promise<AxiosResponse<INote>> => {
    return axiosClient.get<INote>(`/notes/${id}/group/${noteGroupId}`);
};