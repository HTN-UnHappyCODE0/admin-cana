import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import MainPagePosition from '~/components/pages/chuc-vu/MainPagePosition';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Quản lý chức vụ</title>
				<meta name='description' content='Quản lý chức vụ' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer bg={true}>
				<MainPagePosition />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Quản lý chức vụ'>{Page}</BaseLayout>;
};
