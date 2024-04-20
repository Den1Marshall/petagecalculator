import { useDispatch } from 'react-redux';
import { AppDispatch } from '../model/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
