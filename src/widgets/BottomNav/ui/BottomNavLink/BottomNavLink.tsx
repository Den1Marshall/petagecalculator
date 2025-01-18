import { Link, LinkProps } from '@nextui-org/react';
import { FC } from 'react';

interface BottomNavLinkProps {
  pathname: string;
}

export const BottomNavLink: FC<BottomNavLinkProps & LinkProps> = ({
  pathname,
  href,
  children,
  className,
  ...rest
}) => {
  return (
    <Link
      href={href}
      color={pathname === href ? 'primary' : 'foreground'}
      className={`flex flex-col items-center ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
};
