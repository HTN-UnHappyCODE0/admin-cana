import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND} from '~/constants/config/enum';
import axiosClient from '.';

const regencyServices = {
	listRegency: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: CONFIG_STATUS | null;
			isDescending: CONFIG_DESCENDING;
			typeFind: CONFIG_TYPE_FIND;
			isPaging: CONFIG_PAGING;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Regency/get-list-regencys`, data, {
			cancelToken: tokenAxios,
		});
	},
	changeStatus: (
		data: {
			uuid: string;
			status: CONFIG_STATUS;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Regency/change-status-regency`, data, {
			cancelToken: tokenAxios,
		});
	},
	upsertRegency: (
		data: {
			uuid: string;
			name: string;
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Regency/upsert-regency`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default regencyServices;
