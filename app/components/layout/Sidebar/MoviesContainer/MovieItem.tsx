import { getGenresUrl, getMoviesUrl } from 'config/api.config'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { MaterialIcon } from '@/components/ui/MaterialIcon'

import { getGenresListEach } from '@/utils/movie/getGenres'

import { IMovie } from '../../../../shared/types/movie.types'

import styles from './MovieList.module.scss'

export const MovieItem: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={styles.item}>
			<Link href={getMoviesUrl(movie.slug)}>
				<a>
					<Image
						width={65}
						height={97}
						src={movie.poster}
						alt={movie.title}
						draggable={false}
						priority
					/>
				</a>
			</Link>
			<div className={styles.info}>
				<div>
					<div className={styles.title}>{movie.title}</div>
					<div className={styles.genres}>
						{movie.genres.map((genre, idx) => (
							<Link key={genre._id} href={getGenresUrl(genre.slug)}>
								<a>{getGenresListEach(idx, movie.genres.length, genre.name)}</a>
							</Link>
						))}
					</div>
				</div>
				<div className={styles.rating}>
					<MaterialIcon name="MdStarRate" />
					<span>{movie.rating.toFixed(1)}</span>
				</div>
			</div>
		</div>
	)
}
