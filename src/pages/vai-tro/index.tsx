import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import MainPageRole from '~/components/pages/vai-tro/MainPageRole';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Vai trò & phân quyền</title>
				<meta name='description' content='Vai trò & phân quyền' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer>
				<MainPageRole />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Vai trò & phân quyền'>{Page}</BaseLayout>;
};
