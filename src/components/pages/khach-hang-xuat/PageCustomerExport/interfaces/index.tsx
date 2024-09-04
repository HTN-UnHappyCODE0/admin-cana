export interface PropsPageCustomerExport {}
import {IAddress} from '~/constants/config/interfaces';

export interface IPageCustomerExport {
	taxCode: string;
	email: string;
	director: string;
	description: string;
	address: string;
	created: string;
	updated: string;
	lstCustomer: string[];
	phoneNumber: string;
	isSift: number;
	detailAddress: IAddress;
	userOwnerUu: {
		code: string;
		fullName: string;
		uuid: string;
	};
	code: string;
	name: string;
	status: number;
	uuid: string;
	bankName: string;
	bankAccount: string;
	totalBillDemo: number;
	totalBillKCS: number;
	totalTransactionIn: number;
	totalTransactionOut: number;
	tax: number;
	countCustomer: number;
	lastTransaction: null;
	debtDemo: number;
	debtReal: number;
	type: number;
	companyUu: {
		code: string;
		name: string;
		status: number;
		uuid: string;
	};
}
