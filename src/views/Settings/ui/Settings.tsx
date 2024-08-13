import { SelectTheme } from '@/features/SelectTheme';
import { SettingsDivider } from './SettingsDivider';
import { Logout } from '@/features/Logout';
import { DeleteAccount } from '@/features/DeleteAccount';

export default function Settings() {
  return (
    <main className='h-[calc(100%_-_64px)] flex flex-col'>
      <h1 className='text-6xl text-center font-pacifico'>Settings</h1>
      <div className='flex flex-col mt-10'>
        <SelectTheme />
        <SettingsDivider />
        <Logout />
        <SettingsDivider />
        <DeleteAccount />
      </div>
    </main>
  );
}
