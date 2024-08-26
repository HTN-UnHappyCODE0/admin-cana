import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import UpdateCustomerExport from '~/components/pages/khach-hang-xuat/UpdateCustomerExport';
export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Chỉnh sửa khách hàng xuất</title>
				<meta name='description' content='Chỉnh sửa khách hàng xuất' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer bg={true}>
				<UpdateCustomerExport />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Khách hàng xuất'>{Page}</BaseLayout>;
};
