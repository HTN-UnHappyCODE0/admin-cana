import React, {useState} from 'react';

import {PropsMainStatisticalWarehouse} from './interfaces';
import styles from './MainStatisticalWarehouse.module.scss';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY, TYPE_STORE} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import warehouseServices from '~/services/warehouseServices';
import DashboardWarehouse from '../DashboardWarehouse';

function MainStatisticalWarehouse({}: PropsMainStatisticalWarehouse) {
	const [uuidCompany, setUuidCompany] = useState<string>('');
	const [uuidTypeProduct, setUuidTypeProduct] = useState<number | null>(null);
	const {data: dataWarehouse} = useQuery([QUERY_KEY.thong_ke_kho_hang, uuidCompany, uuidTypeProduct], {
		queryFn: () =>
			httpRequest({
				isData: true,
				http: warehouseServices.dashbroadWarehouse({typeProduct: uuidTypeProduct, companyUuid: uuidCompany as string}),
			}),
		select(data) {
			if (data) {
				return data.data;
			}
		},
	});

	return (
		<div className={styles.container}>
			<DashboardWarehouse
				isTotal={true}
				total={dataWarehouse?.total}
				productTotal={dataWarehouse?.productTotal}
				qualityTotal={dataWarehouse?.qualityTotal}
				specTotal={dataWarehouse?.specTotal}
				setUuidCompany={setUuidCompany}
				setUuidTypeProduct={setUuidTypeProduct}
			/>
			{dataWarehouse?.detailWarehouseSpec?.map((v: any) => (
				<DashboardWarehouse dataWarehouse={v} key={v?.uuid} isTotal={false} />
			))}
		</div>
	);
}

export default MainStatisticalWarehouse;
