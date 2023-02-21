import {AxiosResponse} from "axios";
import axiosClient from "../config/httpRequest.config";
import {IExpense} from "../models/Expense.model";

export const apiExpenses = async (params?: any): Promise<AxiosResponse<IExpense[]>> => {
    return axiosClient.get<IExpense[]>(`/expenses`, {params});
};

export const apiExpense = async (
    id: string
): Promise<AxiosResponse<IExpense>> => {
    return axiosClient.get<IExpense>(`/expenses/${id}`);
};

export const apiCreateExpense = async (
    expense: IExpense
): Promise<AxiosResponse<IExpense>> => {
    return axiosClient.post<IExpense>(`/expenses/create`, expense);
};

export const apiUpdateExpense = async (
    id: string,
    expense: IExpense
): Promise<AxiosResponse<IExpense>> => {
    return axiosClient.put<IExpense>(`/expenses/${id}`, expense);
};

export const apiDeleteExpense = async (
    id: string
): Promise<AxiosResponse<IExpense>> => {
    return axiosClient.delete<IExpense>(`/expenses/${id}`);
};

export const apiExpenseCount = async (
    params?: any
): Promise<AxiosResponse<number>> => {
    return axiosClient.get<number>(`/expenses/count`, {params});
};