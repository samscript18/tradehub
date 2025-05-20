interface NavGroup {
  name: string;
  icon?: string;
  link: string;
  subLinks?: NavGroup[];
}

export const navLinks: NavGroup[] = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'About Us',
    link: '/#about-us',
  },
  {
    name: 'Features',
    link: '/#features',
  },
  {
    name: 'Contact',
    link: '/#contact',
  },
];
