import { FC } from 'react'

import Menu from './Menu'
import { firstMenu, userMenu } from './menu.data'
import GenreMenu from '@/components/layout/Navigation/MenuContainer/genres/GenreMenu'

export const MenuContainer: FC = () => {
	return (
		<div>
			<Menu menu={firstMenu} />
			<GenreMenu/>
			<Menu menu={userMenu} />
		</div>
	)
}

export default MenuContainer
