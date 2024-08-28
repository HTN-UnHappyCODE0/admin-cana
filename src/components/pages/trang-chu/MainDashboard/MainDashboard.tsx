import React from 'react';

import {PropsMainDashboard} from './interfaces';
import styles from './MainDashboard.module.scss';
import GeneralStatistics from '../GeneralStatistics';
import WarehouseStatistics from '../WarehouseStatistics';
import ChartImportCompany from '../ChartImportCompany';
import ChartExportCompany from '../ChartExportCompany';

function MainDashboard({}: PropsMainDashboard) {
	return (
		<div className={styles.container}>
			<GeneralStatistics />
			<WarehouseStatistics />
			<WarehouseStatistics />
			<WarehouseStatistics />
			<ChartImportCompany />
			<ChartExportCompany />
		</div>
	);
}

export default MainDashboard;
