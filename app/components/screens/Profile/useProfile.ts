import { UseFormSetValue, SubmitHandler } from 'react-hook-form';
import { IProfileInput } from './profile.interface';
import { useMutation, useQuery } from 'react-query';
import { UsersService } from '@/services/user.service';
import { toastrError } from '../../../utils/toastr-error';
import { toastr } from 'react-redux-toastr';
export const useProfile = (setValue: UseFormSetValue<IProfileInput>) => {
    const {isLoading} = useQuery(
    'profile',
    () => UsersService.getProfile(), 
    {
        onSuccess: ({data}) => {
            setValue('email', data.email)
        },
        onError: (error) => {
            toastrError(Error, 'Get profile')
        },
    } )

    const { mutateAsync } = useMutation(
        'update profile',
        (data: IProfileInput) => UsersService.updateProfile(data), {
            onError: (error) => {
                toastrError(error, 'Update profile')
            },
            onSuccess() {
                toastr.success('Update profile', 'update was successful')
            }
        }
    )

    const onSubmit: SubmitHandler<IProfileInput> = async (data) => {
        await mutateAsync(data)
    }

    return { onSubmit, isLoading}
}