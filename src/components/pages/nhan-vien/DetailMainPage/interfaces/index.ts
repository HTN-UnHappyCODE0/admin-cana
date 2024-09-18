export interface PropsDetailMainPage {}
import {IAddress} from '~/constants/config/interfaces';

export interface IUserDetail {
	birthDay: string;
	address: string;
	description: string;
	detailAddress: {
		province: {
			uuid: string;
			code: string;
			name: string;
			warehouseUu: null;
		};
		district: {
			uuid: string;
			code: string;
			name: string;
			warehouseUu: null;
		};
		town: {
			uuid: string;
			code: string;
			name: string;
			warehouseUu: null;
		};
	};
	sex: number;
	userOwnerUu: {
		code: string;
		fullName: string;
		uuid: string;
	};
	phoneNumber: string;
	email: string;
	account: string | null;
	linkImage: string;
	regencyUu: IRegencyUu;
	status: number;
	code: string;
	fullName: string;
	provinceOwner: string;
	uuid: string;
}

export interface IRegencyUu {
	code: string | null;
	id: number;
	name: string;
	status: number;
	uuid: string;
}
export interface ICustomer {
	taxCode: string;
	email: string;
	director: string;
	description: string;
	address: string;
	customerSpec: ICustomerSpec[];
	phoneNumber: string;
	isSift: number;
	status: number;
	detailAddress: IAddress;
	partnerUu: {
		code: string;
		name: string;
		status: number;
		uuid: string;
	};
	userUu: {
		code: string;
		fullName: string;
		uuid: string;
	};
	code: string;
	name: string;
	uuid: string;
	created: string;
	updated: string;
}

export interface ICustomerSpec {
	status: number;
	specUuid: string;
	productTypeUuid: string;
	uuid: string;
}
