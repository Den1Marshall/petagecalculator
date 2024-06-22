import { SelectTheme } from '@/features/SelectTheme';
import { SettingsDivider } from './SettingsDivider';

export default function Settings() {
  return (
    <main>
      <h1 className='text-6xl text-center font-pacifico'>Settings</h1>
      <div className='flex flex-col mt-10'>
        <SelectTheme />
        <SettingsDivider />
      </div>
    </main>
  );
}
