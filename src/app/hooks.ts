import _ from 'lodash';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { TasqueDispatch, TasqueState } from '../stores';

export const useTasqueDispatch = () => useDispatch<TasqueDispatch>();
export const useTasqueSelector: TypedUseSelectorHook<TasqueState> = useSelector;
export function useTasqueObjectSelector<T>(selector: (state: TasqueState) => T) {
  return useTasqueSelector(selector, _.isEqual);
}
