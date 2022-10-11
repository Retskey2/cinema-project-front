import Link from 'next/link'
import { FC } from 'react'

import { MovieItem } from './MovieItem'
import styles from './MovieList.module.scss'
import { IMovieList } from './movie-list.interface'

export const MoviesList: FC<IMovieList> = ({ link, title, movies }) => {
	return (
		<div className={styles.list}>
			<div className={styles.heading}>{title}</div>
			{movies.map((movie) => (
				<MovieItem movie={movie} key={movie._id} />
			))}
			<Link href={link}>
				<a className={styles.button}>See more</a>
			</Link>
		</div>
	)
}
