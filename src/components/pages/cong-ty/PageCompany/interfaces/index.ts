import {IAddress} from '~/constants/config/interfaces';

export interface PropsPageCompany {}
export interface ICompany {
	description: string;
	detailAddress: IAddress;
	scalesStation: string[];
	created: string;
	updatedTime: string;
	address: string;
	phoneNumber: string;
	dirrector: string;
	code: string;
	name: string;
	status: number;
	uuid: string;
	parentCompanyUu: {
		code: string;
		name: string;
		status: number;
		uuid: string;
	};
	transportPrice: number;
}
