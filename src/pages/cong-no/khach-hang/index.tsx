import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import LayoutPages from '~/components/layouts/LayoutPages';
import {PATH} from '~/constants/config';
import PageDebtCompany from '~/components/pages/cong-no/PageDebtCompany';
import PageDebtCustomer from '~/components/pages/cong-no/PageDebtCustomer';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Công nợ công ty</title>
				<meta name='description' content='Công nợ công ty' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<LayoutPages
				listPages={[
					{
						title: 'Công nợ công ty',
						url: PATH.CongNo,
					},
					// {
					// 	title: 'Công nợ khách hàng',
					// 	url: PATH.CongNoKhachHang,
					// },
					{
						title: 'Lịch sử thanh toán',
						url: PATH.LichSuThanhToan,
					},
				]}
			>
				<PageDebtCustomer />
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
