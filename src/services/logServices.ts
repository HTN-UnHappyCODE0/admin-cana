import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_TYPE_FIND} from '~/constants/config/enum';
import axiosClient from '.';

const logServices = {
	getListLog: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			isDescending: CONFIG_DESCENDING;
			typeFind: CONFIG_TYPE_FIND;
			isPaging: CONFIG_PAGING;
			status: number | null;
			caseId: number | null;
			weightSessionUuid: string;
			type: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/CaseLog/get-list-caselog`, data, {
			cancelToken: tokenAxios,
		});
	},
	createLog: (
		data: {
			weightSessionUuid: string;
			caseId: number;
			caseSelectionId: number;
			planSelectionId: number;
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/CaseLog/create-caselog`, data, {
			cancelToken: tokenAxios,
		});
	},
	detailLog: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/CaseLog/detail-caselog`, data, {
			cancelToken: tokenAxios,
		});
	},

	feedBackLog: (data: {uuid: string; status: number; description: string}, tokenAxios?: any) => {
		return axiosClient.post(`/CaseLog/feedback-caselog`, data, {cancelToken: tokenAxios});
	},
	getListActionAudit: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			isDescending: CONFIG_DESCENDING;
			typeFind: CONFIG_TYPE_FIND;
			isPaging: CONFIG_PAGING;
			status: number | null;
			caseId: number | null;
			weightSessionUuid: string;
			type: number | null;
			username: string;
			timeStart: string | null;
			timeEnd: string | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/CaseLog/get-list-action-audit`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default logServices;
