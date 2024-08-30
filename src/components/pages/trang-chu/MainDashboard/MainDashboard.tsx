import React, {useState} from 'react';

import {PropsMainDashboard} from './interfaces';
import styles from './MainDashboard.module.scss';
import GeneralStatistics from '../GeneralStatistics';
import WarehouseStatistics from '../WarehouseStatistics';
import ChartImportCompany from '../ChartImportCompany';
import ChartExportCompany from '../ChartExportCompany';
import ChartServiceCompany from '../ChartServiceCompany';
import {ContextDashbroad} from './context';

function MainDashboard({}: PropsMainDashboard) {
	const [partnerUuid, setPartnerUuid] = useState<string>('');

	return (
		<ContextDashbroad.Provider
			value={{
				partnerUuid: partnerUuid,
				setPartnerUuid: setPartnerUuid,
			}}
		>
			<div className={styles.container}>
				<GeneralStatistics />
				<WarehouseStatistics />
				<WarehouseStatistics />
				<WarehouseStatistics />
				<ChartImportCompany />
				<ChartExportCompany />
				<ChartServiceCompany />
			</div>
		</ContextDashbroad.Provider>
	);
}

export default MainDashboard;
