import { getMoviesUrl } from 'config/api.config'
import { FC } from 'react'

import { Meta } from '../../../utils/meta/Meta'
import Description from '../Heading/Description'
import Heading from '../Heading/Heading'
import GalleryItem from '../gallery/GalleryItem'

import { ICatalog } from './Catalog.interface'
import styles from './Catalog.module.scss'

const Catalog: FC<ICatalog> = ({ title, description, movies }) => {
	return (
		<Meta title={title} description={description}>
			<Heading title={title} className={styles.heading} />
			{description && (
				<Description text={description} className={styles.description} />
			)}
			<section className={styles.movies}>
				{movies.map((movie) => (
					<GalleryItem
						key={movie._id}
						item={{
							name: movie.title,
							posterPath: movie.bigPoster,
							link: getMoviesUrl(movie.slug),
							content: {
								title: movie.title,
							},
						}}
						variant="horizontal"
					/>
				))}
			</section>
		</Meta>
	)
}

export default Catalog
