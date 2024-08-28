import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import MainPagePartner from '~/components/pages/nha-cung-cap/MainPagePartner';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Danh sách đối tác</title>
				<meta name='description' content='Danh sách đối tác' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer bg={true}>
				<MainPagePartner />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Quản lý đối tác'>{Page}</BaseLayout>;
};
