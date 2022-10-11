import MoviesList from '@/components/screens/Admin/Movies/MoviesList'

import { NextAuthPage } from '@/shared/types/auth.types'

const MovieListPage: NextAuthPage = () => {
	return <MoviesList />
}

MovieListPage.isOnlyAdmin = true
export default MovieListPage
