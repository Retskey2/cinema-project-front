import { useAuth } from '@/hooks/useAuth';
import { useQuery } from 'react-query';
import { UsersService } from '../../../services/user.service';

export const useFavorites = () => {
    const {user} = useAuth()
    const { isLoading, data: favoriteMovies, refetch} = useQuery(
        'favorite movies',
        () => UsersService.getFavorites(), 
        {
            select: ({data}) => data,
            enabled: !!user
        }
    )

    return {
        isLoading, 
        favoriteMovies, refetch
    }
}