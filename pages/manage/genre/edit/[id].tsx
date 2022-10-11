import GenreEdit from '@/components/screens/Admin/Genres/edit/GenreEdit'

import { NextAuthPage } from '@/shared/types/auth.types'

const GenreEditPage: NextAuthPage = () => {
	return <GenreEdit />
}
GenreEditPage.isOnlyAdmin = true
export default GenreEditPage
