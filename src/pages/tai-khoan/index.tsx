import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import MainPageAccount from '~/components/pages/tai-khoan/MainPageAccount';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Quản lý tài khoản</title>
				<meta name='description' content='Quản lý tài khoản' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer bg={true}>
				<MainPageAccount />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Quản lý tài khoản'>{Page}</BaseLayout>;
};
