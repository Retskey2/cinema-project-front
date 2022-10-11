import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { UsersService } from '@/services/user.service'

import { toastrError } from '@/utils/toastr-error'

import { getAdminUrl } from '../../../../../config/url.config'

import { IUserEditInput } from './user-edit.interface'

export const useUserEdit = (setValue: UseFormSetValue<IUserEditInput>) => {
	const { push, query } = useRouter()

	const userId = String(query.id)

	const { isLoading } = useQuery(
		['user', userId],
		() => UsersService.getById(userId),
		{
			onSuccess: ({ data }) => {
				setValue('email', data.email)
                setValue('isAdmin', data.isAdmin)
			},
			onError: (error) => {
				toastrError(error, 'Get user')
			},
			enabled: !!query.id,
		}
	)

	const { mutateAsync } = useMutation(
		'update user',
		(data: IUserEditInput) => UsersService.updateUser(userId, data),
		{
			onError: (error) => {
				toastrError(error, 'Update user')
			},
			onSuccess: () => {
				toastr.success('Update user', 'update was successful')
				push(getAdminUrl('users'))
			},
		}
	)

	const onSubmit: SubmitHandler<IUserEditInput> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
