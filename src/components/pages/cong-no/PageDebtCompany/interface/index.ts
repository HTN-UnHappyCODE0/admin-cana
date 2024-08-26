export interface PropsPageDebtCompany {}

export interface IPartnerDebt {
	debtDemo: number;
	debtReal: number;
	tax: number;
	countCustomer: number;
	lastTransaction: {
		code: string;
		status: number;
		totalAmount: number;
		created: string;
		creatorUu: string;
		uuid: string;
	} | null;
	phoneNumber: string;
	isSift: number;
	detailAddress: any;
	userOwnerUu: any;
	code: string;
	name: string;
	status: number;
	type: number;
	uuid: string;
}
