import { FC } from 'react'

import { useFavorites } from '@/screens/Favorites/useFavorites'

import { useAuth } from '@/hooks/useAuth'

import { SkeletonLoader } from '../../../../ui/SkeletonLoader'
import { MoviesList } from '../MoviesList'

import { NotAuthFavoriteMovies } from './NotAuthFavoriteMovies'

const FavoriteMovies: FC = () => {
	const { isLoading, favoriteMovies } = useFavorites()

	const { user } = useAuth()

	if (!user) return <NotAuthFavoriteMovies />

	return isLoading ? (
		<div className="mt-11">
			<SkeletonLoader count={3} className="h-28 mb-4" />
		</div>
	) : (
		<MoviesList
			link="/favorites"
			movies={favoriteMovies?.slice(0, 3) || []}
			title="Favorites"
		/>
	)
}

export default FavoriteMovies
