import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_TYPE_FIND} from '~/constants/config/enum';
import axiosClient from '.';

const batchBillServices = {
	getListBill: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			isDescending: CONFIG_DESCENDING;
			typeFind: CONFIG_TYPE_FIND;
			isPaging: CONFIG_PAGING;
			scalesType: number[];
			isBatch: number | null;
			isCreateBatch: number | null;
			status: number[];
			state?: number[];
			timeStart: string | null;
			timeEnd: string | null;
			specificationsUuid: string;
			warehouseUuid: string;
			productTypeUuid: string;
			qualityUuid: string;
			transportType: number | null;
			shipUuid?: string;
			typeCheckDay: number | 0;
			scalesStationUuid: string | null;
			storageUuid: string | null;
			isHaveDryness: number | null;
			truckPlates: string[];
			customerUuid: string;
			listCustomerUuid: string[];
			isNeedConfirmReject?: number;
			companyUuid: string;
			listIsBatch?: number[];
			documentId?: string;
			isExportSpec?: number;
			listCompanyUuid?: string[];
			listPartnerUuid?: string[];
			typeProduct?: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BatchBill/get-list-bill`, data, {
			cancelToken: tokenAxios,
		});
	},
	upsertBatchBill: (
		data: {
			batchUuid: string;
			shipUuid: string;
			shipOutUuid: string;
			transportType: number | null;
			timeIntend: string | null;
			weightIntent: number | null;
			customerName: string;
			billUuid: string;
			isBatch: number | null;
			isCreateBatch: number | null;
			isSift: number | null;
			scalesType: number | null;
			fromUuid: string;
			toUuid: string;
			documentId: string;
			description: string;
			isPrint: number | null;
			specificationsUuid: string;
			productTypeUuid: string;
			lstTruckPlateAdd: string[];
			lstTruckPlateRemove: string[];
			reason?: string;
			scaleStationUuid: string;
			portname: string;
			storageTemporaryUuid?: string;
			numShip?: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BatchBill/upsert-batchbill`, data, {
			cancelToken: tokenAxios,
		});
	},
	deleteBatchBill: (data: {uuid: string; description: string}, tokenAxios?: any) => {
		return axiosClient.post(`/BatchBill/delete-batchbill`, data, {cancelToken: tokenAxios});
	},
	startBatchbill: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BatchBill/start-batchbill`, data, {
			cancelToken: tokenAxios,
		});
	},
	detailBatchbill: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BatchBill/detail-batchbill`, data, {
			cancelToken: tokenAxios,
		});
	},
	stopBatchbill: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BatchBill/scale-done-batchbill`, data, {
			cancelToken: tokenAxios,
		});
	},
	QLKConfirmBatchbill: (
		data: {
			uuid: string[];
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BatchBill/qlk-confirm-bill`, data, {
			cancelToken: tokenAxios,
		});
	},
	KTKConfirmBatchbill: (
		data: {
			uuid: string[];
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BatchBill/ktk-confirm-bill`, data, {
			cancelToken: tokenAxios,
		});
	},
	QLKRejectBatchbill: (
		data: {
			uuid: string[];
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BatchBill/reject-bill-to-qlk`, data, {
			cancelToken: tokenAxios,
		});
	},
	updatePort: (
		data: {
			uuid: string[];
			portname: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BatchBill/update-port`, data, {
			cancelToken: tokenAxios,
		});
	},
	dashbroadBillIn: (
		data: {
			partnerUuid: string;
			companyUuid: string;
			typeFindDay: number;
			timeStart: string;
			timeEnd: string;
			isShowBDMT: number | null;
			storageUuid: string;
			customerUuid: string[];
			warehouseUuid: string;
			userOwnerUuid: string[];
			provinceId: string[];
			transportType: number | null;
			listCompanyUuid: string[];
			listPartnerUuid: string[];
			userPartnerUuid?: string[];
			typeShow?: number;
			productTypeUuid?: string;
			qualityUuid?: string;
			specificationUuid?: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BatchBill/dashbroad-bill-in`, data, {
			cancelToken: tokenAxios,
		});
	},
	dashbroadBillOut: (
		data: {
			partnerUuid: string;
			companyUuid: string;
			typeFindDay: number;
			timeStart: string;
			timeEnd: string;
			isShowBDMT: number | null;
			storageUuid: string;
			customerUuid: string[];
			warehouseUuid: string;
			userOwnerUuid: string[];
			provinceId: string[];
			transportType: number | null;
			listCompanyUuid: string[];
			listPartnerUuid: string[];
			userPartnerUuid?: string[];
			typeShow?: number;
			productTypeUuid?: string;
			qualityUuid?: string;
			specificationUuid?: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BatchBill/dashbroad-bill-out`, data, {
			cancelToken: tokenAxios,
		});
	},
	dashbroadBillService: (
		data: {
			partnerUuid: string;
			companyUuid: string;
			typeFindDay: number;
			timeStart: string;
			timeEnd: string;
			isShowBDMT: number | null;
			storageUuid: string;
			customerUuid: string[];
			warehouseUuid: string;
			userOwnerUuid: string[];
			provinceId: string[];
			transportType: number | null;
			listCompanyUuid: string[];
			listPartnerUuid: string[];
			userPartnerUuid?: string[];
			typeShow?: number;
			productTypeUuid?: string;
			qualityUuid?: string;
			specificationUuid?: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BatchBill/dashbroad-bill-service`, data, {
			cancelToken: tokenAxios,
		});
	},
	ViewActionAudit: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BatchBill/view-action-audit`, data, {
			cancelToken: tokenAxios,
		});
	},
	exportExcel: (
		data: {
			pageSize?: number;
			page?: number | null;
			keyword: string | null;
			isDescending: number;
			typeFind: number;
			isPaging: number;
			scalesType: number[];
			isBatch: number | null;
			transportType: number | null;
			isCreateBatch: number | null;
			status: number[];
			state: number[];
			timeStart: string | null;
			timeEnd: string | null;
			warehouseUuid: string;
			qualityUuid: string;
			specificationsUuid: string;
			productTypeUuid: string;
			storageUuid: string;
			shipUuid: string;
			typeCheckDay: number;
			scalesStationUuid: string;
			documentId: string;
			isExportSpec?: number | null;
			isHaveDryness?: number | null;
			truckPlates: string[];
			customerUuid: string;
			listCustomerUuid: string[];
			companyUuid: string;
			isNeedConfirmReject?: number;
			listIsBatch?: number[];
			typeProduct?: number;
			listCompanyUuid?: string[];
			listPartnerUuid?: string[];
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BatchBill/export-excel-bill`, data, {
			cancelToken: tokenAxios,
		});
	},
	reupDryness: (
		data: {
			billUuid: string[];
			drynessNew: number;
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BatchBill/reup-dryness-bill`, data, {
			cancelToken: tokenAxios,
		});
	},
	upsertBillNoScales: (
		data: {
			batchUuid: string;
			shipUuid: string;
			shipOutUuid: string;
			transportType: number | null;
			timeIntend: string | null;
			weight1: number | null;
			weight2: number | null;
			customerName: string;
			billUuid: string;
			isBatch: number | null;
			isCreateBatch: number | null;
			isSift: number | null;
			scalesType: number | null;
			fromUuid: string;
			toUuid: string;
			documentId: string;
			description: string;
			isPrint: number | null;
			specificationsUuid: string;
			productTypeUuid: string;
			lstTruckPlateAdd: string[];
			lstTruckPlateRemove: string[];
			reason?: string;
			scaleStationUuid: string | null;
			portname: string;
			storageTemporaryUuid?: string;
			timeStart: string | null;
			timeEnd: string | null;
			descriptionWs: string;
			paths: string[];
			dryness: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BatchBill/upsert-bill-no-scale`, data, {
			cancelToken: tokenAxios,
		});
	},
	updateShipTemp: (
		data: {
			uuid: string;
			shipUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BatchBill/update-ship-temp`, data, {
			cancelToken: tokenAxios,
		});
	},
	reStartBatchbill: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BatchBill/restart-bill`, data, {
			cancelToken: tokenAxios,
		});
	},
	kcsDoneBill: (
		data: {
			uuid: string[];
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BatchBill/kcs-done-bill`, data, {
			cancelToken: tokenAxios,
		});
	},
	updateWeighReject: (
		data: {
			uuid: string;
			weightReject: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BatchBill/update-weight-reject`, data, {
			cancelToken: tokenAxios,
		});
	},
	confirmWeighReject: (
		data: {
			uuid: string;
			isConfirm: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BatchBill/confirm-weight-reject`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default batchBillServices;
