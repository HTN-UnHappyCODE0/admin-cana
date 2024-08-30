export interface PropsWarehouseStatistics {
	infoCompany: {
		debt: {
			debtDemo: number;
			debtKCS: number;
			debtReal: number;
			totalDebt: number;
		};
		weight: {
			amountBdmtDemo: number;
			amountBdmt: number;
			totalAmountBdmt: number;
		};
		companyDTO: {
			code: string;
			name: string;
			status: number;
			uuid: string;
		};
	};
	isLoading: boolean;
}
