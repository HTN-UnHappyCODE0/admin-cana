import React from 'react';

import {PropsChartExportCompany} from './interfaces';
import styles from './ChartExportCompany.module.scss';

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import SelectFilterOption from '../SelectFilterOption';
import SelectFilterDate from '../SelectFilterDate';
import {convertCoin} from '~/common/funcs/convertCoin';

function ChartExportCompany({}: PropsChartExportCompany) {
	const data = [
		{
			name: '21/07/2024',
			'Gỗ dăm keo': 4000,
			'Gỗ dăm bạch đàn': 4000,
		},
		{
			name: '22/07/2024',
			'Gỗ dăm keo': 4000,
			'Gỗ dăm bạch đàn': 4000,
		},
		{
			name: '23/07/2024',
			'Gỗ dăm keo': 4000,
			'Gỗ dăm bạch đàn': 4000,
		},
		{
			name: '24/07/2024',
			'Gỗ dăm keo': 4000,
			'Gỗ dăm bạch đàn': 4000,
		},
		{
			name: '25/07/2024',
			'Gỗ dăm keo': 4000,
			'Gỗ dăm bạch đàn': 4000,
		},
		{
			name: '26/07/2024',
			'Gỗ dăm keo': 4000,
			'Gỗ dăm bạch đàn': 4000,
		},
		{
			name: '27/07/2024',
			'Gỗ dăm keo': 4000,
			'Gỗ dăm bạch đàn': 4000,
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h3>Biểu đầu thống kê hàng xuất của tổng công ty</h3>
				<div className={styles.filter}>
					<SelectFilterOption />
					<SelectFilterDate />
				</div>
			</div>
			<div className={styles.head_data}>
				<p className={styles.data_total}>
					Tổng khối lượng xuất hàng: <span>{convertCoin(1460203)}</span>
				</p>
				<div className={styles.data_item}>
					<div style={{background: '#FB923C'}} className={styles.box_color}></div>
					<p className={styles.data_total}>
						Gỗ dăm keo: <span>{convertCoin(1460203)}</span>
					</p>
				</div>
				<div className={styles.data_item}>
					<div style={{background: '#0EA5E9'}} className={styles.box_color}></div>
					<p className={styles.data_total}>
						Gỗ dăm bạch đàn: <span>{convertCoin(1460203)}</span>
					</p>
				</div>
			</div>
			<div className={styles.main_chart}>
				<ResponsiveContainer width='100%' height='100%'>
					<BarChart
						width={500}
						height={300}
						data={data}
						margin={{
							top: 8,
							right: 16,
							left: -8,
							bottom: 8,
						}}
						barSize={44}
					>
						<XAxis dataKey='name' scale='point' padding={{left: 40, right: 10}} />
						<YAxis />
						<Tooltip />
						<CartesianGrid strokeDasharray='3 3' vertical={false} />
						<Bar dataKey='Gỗ dăm keo' stackId='a' fill='#0EA5E9' />
						<Bar dataKey='Gỗ dăm bạch đàn' stackId='a' fill='#FB923C' />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export default ChartExportCompany;
