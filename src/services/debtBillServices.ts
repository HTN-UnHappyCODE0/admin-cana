import {CONFIG_DESCENDING} from '~/constants/config/enum';
import axiosClient from '.';

const debtBillServices = {
	getListDebtBill: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number[];
			isDescending: CONFIG_DESCENDING;
			userUuid: string;
			partnerUuid: string;
			timeStart: string | null;
			timeEnd: string | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/DebtBill/get-list-debt-bill`, data, {
			cancelToken: tokenAxios,
		});
	},
	getDetailDebtBill: (
		data: {
			pageSize: number;
			page: number;
			uuid: string;
			keyword: string;
			status: number[];
			isDescending: CONFIG_DESCENDING;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/DebtBill/detail-debt-bill`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default debtBillServices;
