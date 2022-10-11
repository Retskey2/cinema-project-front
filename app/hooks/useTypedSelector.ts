import { TypedUseSelectorHook, useSelector } from "react-redux";
import { TypeRootState } from '../store/stote';

export const useTypedSelector: TypedUseSelectorHook<TypeRootState> =
useSelector