import {IAddress} from '~/constants/config/interfaces';

export interface PropsMainCreateDirect {}
export interface IFormCreateDirect {
	transportType: number;
	fromUuid: string;
	shipUuid: string;
	shipOutUuid: string;
	toUuid: string;
	productTypeUuid: string;
	specificationsUuid: string;
	weight1: number;
	weight2: number;
	documentId: string;
	description: string;
	warehouseUuid: string;
	storageTemporaryUuid: string;
	timeStart: string | Date;
	timeEnd: string | Date;
	dryness: number;
}

export interface IDetailCustomer {
	email: string;
	director: string;
	description: string;
	address: string;
	created: string;
	updated: string;
	specPriceDTO: any[];
	phoneNumber: string;
	isSift: number;
	transportType: number;
	warehouseUu: {
		uuid: string;
		code: string;
		name: string;
	};
	status: number;
	userUu: {
		code: string;
		fullName: string;
		provinceOwner: {
			uuid: string;
			code: string;
			name: string;
		};
		uuid: string;
	};
	detailAddress: IAddress;
	partnerUu: {
		code: string;
		name: string;
		status: number;
		type: number;
		uuid: string;
	};
	code: string;
	name: string;
	uuid: string;

	customerSpec: IlistCustomerSpec[];
}

export interface IlistCustomerSpec {
	state: number;
	status: number;
	transportType: number;
	specUu: {
		name: string;
		status: number;
		qualityUu: {
			name: string;
			status: number;
			uuid: string;
		};
		uuid: string;
	};
	pricetagUu: {
		code: string;
		amount: number;
		status: number;
		uuid: string;
	};
	qualityUu: {
		name: string;
		status: number;
		uuid: string;
	};
	productTypeUu: {
		code: string;
		name: string;
		status: number;
		type: number;
		uuid: string;
	};
	accountUu: {
		username: string;
		status: number;
		uuid: string;
	};
	storageUu: {
		code: string;
		name: string;
		status: number;
		uuid: string;
	};
	uuid: string;
}
