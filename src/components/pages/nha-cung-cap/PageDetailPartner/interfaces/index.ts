import {IAddress} from '~/constants/config/interfaces';

export interface PropsPageDetailPartner {}

export interface IDetailPartner {
	code: string;
	name: string;
	status: number;
	type: number;
	uuid: string;
	taxCode: string;
	email: string;
	director: string;
	description: string;
	bankName: string;
	bankAccount: string;
	created: string;
	updated: string;
	lstCustomer: any[];
	debtDemo: number;
	debtReal: number;
	tax: number;
	countCustomer: number;
	lastTransaction: {
		code: string;
		status: number;
		totalAmount: number;
		created: string;
		creatorUu: any;
		uuid: string;
	};
	address: string;
	phoneNumber: string;
	isSift: number;
	detailAddress: IAddress;
	userOwnerUu: IUserOwnerUu;
	totalBillDemo: number;
	totalBillKCS: number;
	totalTransactionIn: number;
	totalTransactionOut: number;
	companyUu: {
		code: string;
		name: string;
		status: number;
		uuid: string;
	};
	ktUu: {
		username: string;
		status: number;
		user: any;
		uuid: string;
	};
}

export interface IUserOwnerUu {
	code: string;
	fullName: string;
	uuid: string;
	provinceOwner: string | null;
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
	warehouseUu: {
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
