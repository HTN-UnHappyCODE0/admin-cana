import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import LayoutPages from '~/components/layouts/LayoutPages';
import {PATH} from '~/constants/config';
import PageDebtHistory from '~/components/pages/cong-no/PageDebtHistory';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Lịch sử thanh toán</title>
				<meta name='description' content='Lịch sử thanh toán' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<LayoutPages
				listPages={[
					{
						title: 'Công nợ đối tác',
						url: PATH.CongNo,
					},
					// {
					//     title: 'Công nợ khách hàng',
					//     url: PATH.CongNoKhachHang,
					// },
					{
						title: 'Lịch sử thanh toán',
						url: PATH.LichSuThanhToan,
					},
				]}
			>
				<PageDebtHistory />
			</LayoutPages>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return (
		<BaseLayout bgLight title='Quản lý công nợ'>
			{Page}
		</BaseLayout>
	);
};
