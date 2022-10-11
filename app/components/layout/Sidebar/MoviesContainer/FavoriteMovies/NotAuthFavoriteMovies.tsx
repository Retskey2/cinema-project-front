import { FC } from 'react'

export const NotAuthFavoriteMovies: FC = () => {
	return (
		<div
			className="mt-11 bg-gray-700 bg-opacity-20 py-3 px-5 
    		rounded-lg text-white text-opacity-80"
		>
			For viewing favorites films you should authorize!
		</div>
	)
}
