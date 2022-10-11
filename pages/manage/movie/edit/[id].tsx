import MovieEdit from '@/components/screens/Admin/Movies/edit/MovieEdit'

import { NextAuthPage } from '@/shared/types/auth.types'

const MovieEditPage: NextAuthPage = () => {
	return <MovieEdit />
}
MovieEditPage.isOnlyAdmin = true
export default MovieEditPage
