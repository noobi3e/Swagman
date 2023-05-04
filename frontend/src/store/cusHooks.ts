import { AppDispatch, RootState } from '.'
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'

type DispatchFunc = () => AppDispatch

export const cusDispatch: DispatchFunc = useDispatch
export const cusSelector: TypedUseSelectorHook<RootState> = useSelector

export interface errObj {
  isErr: boolean
  errTxt: string
}
