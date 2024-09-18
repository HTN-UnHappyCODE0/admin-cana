import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import PageCreatePartner from '~/components/pages/nha-cung-cap/PageCreatePartner';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Thêm mới công ty</title>
				<meta name='description' content='Thêm mới công ty' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer bg={true}>
				<PageCreatePartner />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return (
		<BaseLayout bgLight={true} title='Thêm mới công ty'>
			{Page}
		</BaseLayout>
	);
};
