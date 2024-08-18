import {
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  User,
} from 'firebase/auth';

export const reauthenticateUser = async (
  user: User,
  email?: string,
  password?: string
): Promise<void> => {
  try {
    switch (user.providerData[0].providerId) {
      case 'google.com':
        await reauthenticateWithPopup(user, new GoogleAuthProvider());
        break;

      case 'password':
        if (email !== undefined && password !== undefined) {
          await reauthenticateWithCredential(
            user,
            EmailAuthProvider.credential(email, password)
          );
          break;
        } else {
          email = prompt('Enter your email') ?? undefined;
          if (email === undefined) throw new Error('Empty email');

          password = prompt('Enter your password') ?? undefined;
          if (password === undefined) throw new Error('Empty password');

          await reauthenticateWithCredential(
            user,
            EmailAuthProvider.credential(email, password)
          );
          break;
        }

      default:
        break;
    }
  } catch (error) {
    throw error;
  }
};
