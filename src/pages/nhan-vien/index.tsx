import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import MainPage from '~/components/pages/nhan-vien/MainPage';
export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Quản lý nhân viên</title>
				<meta name='description' content='Quản lý nhân viên' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer bg={true}>
				<MainPage />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Quản lý nhân viên'>{Page}</BaseLayout>;
};
