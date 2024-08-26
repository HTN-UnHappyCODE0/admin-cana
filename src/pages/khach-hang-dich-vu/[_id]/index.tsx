import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import DetailCustomerService from '~/components/pages/khach-hang-dich-vu/DetailCustomerService';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Chi tiết khách hàng dịch vụ</title>
				<meta name='description' content='Chi tiết khách hàng dịch vụ' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer>
				<DetailCustomerService />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return (
		<BaseLayout bgLight={true} title='Khách hàng dịch vụ'>
			{Page}
		</BaseLayout>
	);
};
