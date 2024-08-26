import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import DetailMainPage from '~/components/pages/nhan-vien/DetailMainPage';
export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Chi tiết Nhân viên</title>
				<meta name='description' content='Chi tiết Nhân viên' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer bg={true}>
				<DetailMainPage />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return (
		<BaseLayout bgLight={true} title='Quản lý Nhân viên'>
			{Page}
		</BaseLayout>
	);
};
