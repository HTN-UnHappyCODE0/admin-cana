export interface PropsMainProductType {}

export interface IProductType {
	description: string;
	created: string;
	updateTime: string;
	code: string;
	name: string;
	status: number;
	uuid: string;
	colorShow: string;
	type: number;
	normalName: string;
	scientificName: string;
	speciesGroup: string;
	fullName: string;
	companyUu: {
		code: string;
		name: string;
		status: number;
		uuid: string;
	};
}
