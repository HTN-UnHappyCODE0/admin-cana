import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import MainCreateWarehouse from '~/components/pages/kho-hang/components/MainCreateWarehouse';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Thêm kho hàng</title>
				<meta name='description' content='Thêm kho hàng' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer bg={true}>
				<MainCreateWarehouse />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return (
		<BaseLayout bgLight={true} title='Thêm kho hàng'>
			{Page}
		</BaseLayout>
	);
};
