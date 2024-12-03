import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import LayoutPages from '~/components/layouts/LayoutPages';
import {PATH} from '~/constants/config';
import MainAbnormalSituations from '~/components/pages/thong-ke-log/MainAbnormalSituations';
import MainPageLog from '~/components/pages/thong-ke-log/MainPageLog';
export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Tình huống bất thường</title>
				<meta name='description' content='Tình huống bất thường' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<LayoutPages
				listPages={[
					{
						title: 'Log',
						url: PATH.ThongKeLog,
					},
					{
						title: 'Tình huống bất thường',
						url: PATH.TinhHuongBatThuong,
					},
				]}
			>
				<MainPageLog />
			</LayoutPages>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Thống kê log'>{Page}</BaseLayout>;
};
