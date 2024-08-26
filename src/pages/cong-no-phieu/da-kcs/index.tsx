import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import LayoutPages from '~/components/layouts/LayoutPages';
import MainPageKCS from '~/components/pages/cong-no-phieu/MainPageKCS';
import {PATH} from '~/constants/config';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Công nợ phiếu đã KCS</title>
				<meta name='description' content='Công nợ phiếu đã KCS' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<LayoutPages
				listPages={[
					{
						title: 'Tất cả phiếu',
						url: PATH.CongNoPhieu,
					},
					{
						title: 'Chưa KCS',
						url: PATH.CongNoPhieuChuaKCS,
					},
					{
						title: 'Đã KCS',
						url: PATH.CongNoPhieuDaKCS,
					},
				]}
			>
				<MainPageKCS />
			</LayoutPages>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return (
		<BaseLayout bgLight title='Quản lý công nợ phiếu đã KCS'>
			{Page}
		</BaseLayout>
	);
};
