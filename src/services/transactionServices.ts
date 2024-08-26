import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_TYPE_FIND} from '~/constants/config/enum';
import axiosClient from '.';

const transactionServices = {
	listTransaction: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number | null;
			isDescending: CONFIG_DESCENDING;
			typeFind: CONFIG_TYPE_FIND;
			isPaging: CONFIG_PAGING;
			partnerUuid: string;
			type: number | null;
			timeStart: string | null;
			timeEnd: string | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Transaction/list-transaction`, data, {
			cancelToken: tokenAxios,
		});
	},
	detailTransaction: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Transaction/detail-transaction`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default transactionServices;
