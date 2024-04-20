import { useStore } from 'react-redux';
import { AppStore } from '../model/store';

export const useAppStore: () => AppStore = useStore;
