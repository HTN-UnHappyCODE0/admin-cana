export interface PropsTabNavLink {
	query: string;
	outline?: boolean;
	listHref: Array<{title: string; pathname: string; query: string | null}>;
	listKeyRemove?: string[];
}
