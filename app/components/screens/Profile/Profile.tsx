import { FC } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/components/ui/form-elements/Button'

import { Meta } from '../../../utils/meta/Meta'
import Heading from '../../ui/Heading/Heading'
import { SkeletonLoader } from '../../ui/SkeletonLoader'
import AuthFields from '../Auth/AuthFields'

import styles from './Profile.module.scss'
import { IProfileInput } from './profile.interface'
import { useProfile } from './useProfile'

const Profile: FC = () => {
	const { handleSubmit, register, formState, setValue } =
		useForm<IProfileInput>({
			mode: 'onChange',
		})

	const { isLoading, onSubmit } = useProfile(setValue)

	return (
		<Meta title="Profile" description="">
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<Heading title="Profile" className="mb-6" />
				{isLoading ? (
					<SkeletonLoader count={2} />
				) : (
					<AuthFields formState={formState} register={register} />
				)}
				<Button>update</Button>
			</form>
		</Meta>
	)
}

export default Profile
