export interface PropsMainUpdateImport {}

export interface IFormUpdateImport {
	fromUuid: string;
	productTypeUuid: string;
	specificationsUuid: string;
	warehouseUuid: string;
	toUuid: string;
	weight1: number | string;
	weight2: number | string;
	description: string;
	timeStart: string | Date | null;
	timeEnd: string | Date | null;
	transportType: number;
	documentId: string;
	batchUuid: string;
	billUuid: string;
	portname: string;
	shipUuid: string;
	code: string;
	dryness: number;
}
