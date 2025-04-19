import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND} from '~/constants/config/enum';
import axiosClient from '.';

const contractServices = {
	getListContract: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: CONFIG_STATUS | null;
			isDescending: CONFIG_DESCENDING;
			typeFind: CONFIG_TYPE_FIND;
			isPaging: CONFIG_PAGING;
			listPartnerUuid: string[];
			listReceiverUuid: string[];
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Contract/get-list-contract`, data, {
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
		return axiosClient.post(`/Contract/change-status-contract`, data, {
			cancelToken: tokenAxios,
		});
	},
	upsertContract: (
		data: {
			uuid: string;
			name: string;
			timeStart: string | null;
			timeEnd: string | null;
			receiverUuid: string;
			partnerUuid: string;
			description: string;
			note: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Contract/upsert-contract`, data, {
			cancelToken: tokenAxios,
		});
	},
	detailContract: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Contract/detail-contract`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default contractServices;
