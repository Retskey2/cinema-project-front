import GenresList from '@/components/screens/Admin/Genres/GenresList'

import { NextAuthPage } from '@/shared/types/auth.types'

const GenreListPage: NextAuthPage = () => {
	return <GenresList />
}

GenreListPage.isOnlyAdmin = true
export default GenreListPage
