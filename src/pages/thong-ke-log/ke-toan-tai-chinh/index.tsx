import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import LayoutPages from '~/components/layouts/LayoutPages';
import MainAccountant from '~/components/pages/thong-ke-log/MainAccountant';
import {PATH} from '~/constants/config';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Thống kê kế toán tài chính</title>
				<meta name='description' content='Thống kê kế toán tài chính' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<LayoutPages
				listPages={[
					{
						title: 'Dữ liệu cân',
						url: PATH.ThongKeDuLieuCan,
					},
					{
						title: 'Dữ liệu kho',
						url: PATH.ThongKeDuLieuKho,
					},
					{
						title: 'Kế toán & tài chính',
						url: PATH.ThongKeKeToanTaiChinh,
					},
					{
						title: 'Khác',
						url: PATH.ThongKeKhac,
					},
					{
						title: 'Tình huống bất thường',
						url: PATH.TinhHuongBatThuong,
					},
				]}
			>
				<MainAccountant />
			</LayoutPages>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Thống kê log'>{Page}</BaseLayout>;
};
