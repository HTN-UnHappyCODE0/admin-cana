import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import PageCustomerService from '~/components/pages/khach-hang-dich-vu/PageCustomerService';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Khách hàng dịch vụ</title>
				<meta name='description' content='Khách hàng dịch vụ' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer bg={true}>
				<PageCustomerService />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Khách hàng dịch vụ'>{Page}</BaseLayout>;
};
