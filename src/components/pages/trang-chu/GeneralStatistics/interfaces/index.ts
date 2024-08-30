export interface PropsGeneralStatistics {
	weight: {
		amountBdmtDemo: number;
		amountBdmt: number;
		totalAmountBdmt: number;
	};
	debt: {
		debtDemo: number;
		debtKCS: number;
		debtReal: number;
		totalDebt: number;
	};
	isLoading: boolean;
}
