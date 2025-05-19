'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { navLinks } from '@/lib/data';
import { useAuth } from '@/lib/store/auth.store';
import { Loader, UserCircle } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { signOut } from '@/lib/services/admin/auth.service';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, resetUser } = useAuth();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: signOut,
    mutationKey: ['signout'],
    onSuccess() {
      toast.success('Signed out successfully');
      resetUser();
    },
  });

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <div>
            <Link href={'/'}>
              <Image
                src={'/svgs/logo.svg'}
                width={100}
                alt="logo"
                height={50}
              />
            </Link>
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navLinks.map((link) => {
            return (
              <Link
                key={link.name}
                href={link.link}
                className="text-sm font-semibold text-gray-900"
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {!user && (
            <Link href="/login" className="text-sm font-semibold text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}

          {user && (
            <div className="flex items-ceter gap-2">
              <div className="flex items-center gap-3">
                <UserCircle />

                <p className="text-[.9rem] font-semibold">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>
              <p className="text-[1.2rem] text-primary">⦿</p>
              <div
                className={cn(
                  'flex items-center gap-3 text-red-500 hover:opacity-80 cursor-pointer',
                  isPending && 'animate-pulse'
                )}
                onClick={() => mutateAsync()}
              >
                <p className="text-[.9rem] font-semibold">
                  {isPending ? 'Signing Out' : 'Sign Out'}
                </p>
                {isPending && <Loader className="animate-spin" />}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white px-6 py-6 overflow-y-auto sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <div>
              <Link href={'/'}>
                <Image
                  src={'/svgs/logo.svg'}
                  width={100}
                  alt="logo"
                  height={50}
                />
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navLinks.map((link) => {
                  return (
                    <Link
                      key={link.name}
                      href={link.link}
                      className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </div>
              <div className="py-6">
                {!user && (
                  <Link
                    href="/login"
                    className="block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                )}

                {user && (
                  <>
                    <div className="flex items-center gap-3">
                      <UserCircle />

                      <p className="text-[.9rem] font-semibold">
                        {user?.firstName} {user?.lastName}
                      </p>
                    </div>

                    <div
                      className={cn(
                        'flex items-center gap-3 mt-4 text-red-500 cursor-pointer hover:opacity-90',
                        isPending && 'animate-pulse'
                      )}
                      onClick={() => mutateAsync()}
                    >
                      {isPending && <Loader className="animate-spin" />}
                      <p className="text-[.9rem] font-semibold">
                        {isPending ? 'Signing Out' : 'Sign Out'}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
