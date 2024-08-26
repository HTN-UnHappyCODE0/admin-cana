import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import MainCreateRole from '~/components/pages/vai-tro/MainCreateRole';


export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Thêm vai trò</title>
				<meta name='description' content='Thêm vai trò' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer>
				<MainCreateRole />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Thêm vai trò'>{Page}</BaseLayout>;
};
