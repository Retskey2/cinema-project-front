import { FC } from 'react'

import { Meta } from '@/utils/meta/Meta'

import Description from '../../ui/Heading/Description'
import Heading from '../../ui/Heading/Heading'

import styles from './Collection.module.scss'
import CollectionItem from './CollectionItem'
import { ICollection } from './collections.interface'

const title = 'Discovery'
const description = 'In this section you will find all genres on our site'

const Collections: FC<{ collections: ICollection[] }> = ({ collections }) => {
	return (
		<Meta title={title} description={description}>
			<Heading title={title} className={styles.heading} />
			<Description text={description} className={styles.description} />
			<section className={styles.collections}>
				{collections.map((col) => (
					<CollectionItem key={col._id} collection={col} />
				))}
			</section>
		</Meta>
	)
}

export default Collections
