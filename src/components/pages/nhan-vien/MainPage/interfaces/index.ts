export interface PropsMainPage {}

export interface IUser {
	birthDay: string;
	address: string;
	description: string;
	detailAddress: string | null;
	sex: number;
	userOwnerUu: string | null;
	phoneNumber: string;
	email: string;
	accountUsername: string;
	account: any;
	linkImage: string;
	regencyUu: IRegencyUu;
	provinceOwner: string;
	status: number;
	code: string;
	fullName: string;
	uuid: string;
}

export interface IRegencyUu {
	code: string | null;
	id: number;
	name: string;
	status: number;
	uuid: string;
}
