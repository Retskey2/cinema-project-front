import { getMoviesUrl } from 'config/api.config'
import Link from 'next/link'
import { FC } from 'react'

import styles from './AuthPlaceholder.module.scss'

const AuthButton: FC<{ slug: string }> = ({ slug }) => {
	return (
		<Link href={`/auth?redirect=${getMoviesUrl(slug)}`}>
			<a className={styles.btn}>Sign in</a>
		</Link>
	)
}

export default AuthButton
