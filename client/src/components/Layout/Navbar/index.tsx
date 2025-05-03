'use client';
import Link from 'next/link';
import { useState } from 'react';
import { SiNanostores } from 'react-icons/si';
import { AnimatePresence, motion } from 'framer-motion';
import { navLinks } from '@/lib/data';
import { fadeToBottomVariant } from '@/lib/data/variants';
import { useRouter } from 'next/navigation';
import { FiChevronDown } from 'react-icons/fi';
import { signOut, useSession } from 'next-auth/react';
import { FaOpencart } from 'react-icons/fa';
import { BiSearchAlt } from 'react-icons/bi';
import { useModal } from '@/lib/providers/ModalProvider';
import SearchModal from '../../UI/Search/search-modal';
import useCartStore from '@/lib/store/cart.store';
import useUserInfo from '@/lib/hooks/useUserInfo';
import useDropDown from '@/lib/hooks/useDropdown';
import { RiUser3Line } from 'react-icons/ri';
import Image from 'next/image';
import { LuLayoutDashboard } from 'react-icons/lu';
import { IoLogOutOutline } from 'react-icons/io5';
import { useSidebar } from '../../../lib/providers/SideDrawersProvider';
import Cart from '../../UI/Cart';

interface Props {
  showBanner?: boolean;
}

const Navbar = ({ showBanner }: Props) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const router = useRouter();

  const { data: session } = useSession();
  const { user } = useUserInfo();

  const { isOpen, dropdownRef, toggleDropdown } = useDropDown();

  const { showModal } = useModal();

  const { showSidebar } = useSidebar();

  const { items } = useCartStore();

  return (
    <nav className="fixed top-0 left-0 z-[100] w-full bg-white">
      {showBanner && (
        <div className="bg-primary text-white text-sm text-center py-2">
          <p>
            Join Stockly today and simplify your store management - Sign up now!
          </p>
        </div>
      )}
      <div className="container rounded-full py-3 flex items-center justify-between">
        <div>
          <Link href={'/'} className="text-primary flex items-center gap-1">
            <SiNanostores />
            <span>Stockly</span>
          </Link>
        </div>

        <ul className="flex space-x-6">
          {navLinks.map((link, idx) => (
            <li key={idx} className="relative group">
              {link.sublinks ? (
                <button
                  onMouseEnter={() => setOpenDropdown(link.title)}
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="text-text hover:text-primary font-medium flex items-center justify-center gap-1"
                >
                  <span>{link.title}</span>
                  <FiChevronDown
                    className={`duration-150 group-hover:rotate-180`}
                  />
                </button>
              ) : (
                <Link
                  href={link.href!}
                  className="text-text hover:text-primary font-medium"
                >
                  {link.title}
                </Link>
              )}

              <AnimatePresence mode="wait" initial={false}>
                {link.sublinks && openDropdown === link.title && (
                  <motion.ul
                    {...fadeToBottomVariant}
                    className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2"
                    onMouseEnter={() => setOpenDropdown(link.title)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {link.sublinks.map((sublink, subIdx) => (
                      <li key={subIdx}>
                        <Link
                          href={`/${link.title.toLowerCase()}/${sublink
                            .toLowerCase()
                            .replace(/\s+/g, '-')}`}
                          className="block px-4 py-2 text-sm text-text hover:bg-gray-100"
                        >
                          {sublink}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div
            className="relative size-10 rounded-full flex hover:bg-gray-100 duration-300 items-center justify-center border border-gray-200 cursor-pointer select-none"
            onClick={() => showModal(<SearchModal />)}
          >
            <BiSearchAlt size={18} />
          </div>

          <div
            className="relative size-10 rounded-full flex hover:bg-gray-100 duration-300 items-center justify-center border border-gray-200 cursor-pointer select-none"
            onClick={() => showSidebar(<Cart />)}
          >
            <FaOpencart size={18} />

            <div className="size-4 rounded-full bg-accent text-sm font-semibold flex items-center justify-center absolute -top-1 -right-1">
              <span>{items?.length || 0}</span>
            </div>
          </div>

          {session ? (
            <div className="relative" ref={dropdownRef}>
              <div
                className="size-10 border cursor-pointer rounded-full flex items-center justify-center "
                onClick={toggleDropdown}
              >
                <RiUser3Line size={18} />
              </div>

              <AnimatePresence mode="wait" initial={false}>
                {isOpen && (
                  <motion.div
                    {...fadeToBottomVariant}
                    className="absolute top-[104%] right-0 w-52 bg-white shadow-lg rounded-lg p-4 space-y-4"
                  >
                    <div className="text-center space-y-1">
                      <div className="size-16 mx-auto rounded-full relative overflow-hidden">
                        <Image
                          src={user?.profilePicture || '/images/avatar.png'}
                          alt="user"
                          width={100}
                          height={100}
                          className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="size-8 rounded-full flex border duration-300 hover:bg-gray-50 items-center justify-center"
                        onClick={() => router.push('/dashboard')}
                      >
                        <LuLayoutDashboard />
                      </button>
                      <button
                        className="size-8 rounded-full flex border duration-300 hover:bg-gray-50 items-center justify-center"
                        onClick={() => signOut({ redirect: false })}
                      >
                        <IoLogOutOutline />
                      </button>
                    </div>

                    {/* <button
                  className="text-black rounded-lg border-2 border-primary bg-accent px-6 text-sm py-[10px] duration-300"
                  onClick={() => router.push("/dashboard")}
                >
                  Dashboard
                </button> */}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <button
                className="text-primary rounded-lg border-2 border-primary px-8 py-[10px] duration-300 hover:bg-primary hover:text-white"
                onClick={() => router.push('/login')}
              >
                Login
              </button>
              <button
                className="text-black rounded-lg border-2 border-primary bg-accent px-8 py-[10px] duration-300"
                onClick={() => router.push('/register')}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
