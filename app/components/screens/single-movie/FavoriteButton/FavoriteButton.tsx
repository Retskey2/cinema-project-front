import cn from 'classnames'
import { FC, useEffect, useState } from 'react'
import { useMutation } from 'react-query'

import { UsersService } from '../../../../services/user.service'
import { toastrError } from '../../../../utils/toastr-error'
import { useFavorites } from '../../Favorites/useFavorites'

import styles from './FavoriteButton.module.scss'

const FavoriteButton: FC<{ movieId: string }> = ({ movieId }) => {
	const [isSmashed, setIsSmashed] = useState(false)

	const { favoriteMovies, refetch } = useFavorites()

	useEffect(() => {
		if (favoriteMovies) {
			const isHasMovie = favoriteMovies.some((f) => f._id === movieId)
			if (isSmashed !== isHasMovie) setIsSmashed(isHasMovie)
		}
	}, [favoriteMovies, isSmashed, movieId])

	const { mutateAsync } = useMutation(
		'update actor',
		() => UsersService.toggleFavorite(movieId),
		{
			onError(error) {
				toastrError(error, 'Update favorite list')
			},
			onSuccess() {
				setIsSmashed(!isSmashed)
				refetch()
			},
		}
	)

	return (
		<button
			onClick={() => mutateAsync()}
			className={cn(styles.button, {
				[styles.animate]: isSmashed,
			})}
			style={{ backgroundImage: `url('/heart-animation.png')` }}
		/>
	)
}

export default FavoriteButton
