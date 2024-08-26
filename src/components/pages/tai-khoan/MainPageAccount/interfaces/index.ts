export interface PropsMainPageAccount {}

export interface IAccount {
	created: string;
	updatedTime: string;
	code: string;
	authorities: null;
	roleUuid: null;
	user: IUser;
	username: string;
	status: number;
	uuid: string;
}

export interface IUser {
	linkImage: null;
	phoneNumber: string;
	email: string;
	regencyUu: IRegency;
	code: string;
	fullName: string;
	uuid: string;
}

export interface IRegency {
	id: number;
	code: null;
	status: number;
	name: string;
	uuid: string;
}
