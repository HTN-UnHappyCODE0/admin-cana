import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import LayoutPages from '~/components/layouts/LayoutPages';
import ListWarehouse from '~/components/pages/kho-hang/danh-sach/ListWarehouse';
import {PATH} from '~/constants/config';

export default function Home() {
	return (
		<Fragment>
			<Head>
				<title>Danh sách kho hàng</title>
				<meta name='description' content='Danh sách kho hàng' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<LayoutPages
				listPages={[
					{
						title: 'Thống kê kho hàng',
						url: PATH.KhoHangThongKe,
					},
					{
						title: 'Danh sách kho hàng',
						url: PATH.KhoHangDanhSach,
					},
				]}
			>
				<ListWarehouse />
			</LayoutPages>
		</Fragment>
	);
}

Home.getLayout = function (Page: ReactElement) {
	return (
		<BaseLayout bgLight title='Quản lý kho hàng'>
			{Page}
		</BaseLayout>
	);
};
