import { useState } from 'react';
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import MotionWrapper from '../components/MotionWrapper';

export default function Header({ pathname }: { pathname: string }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { href: '/about', label: '關於我' },
        { href: '/skills', label: '技能' },
        { href: '/projects', label: '專案' },
        { href: '/blog', label: '部落格' },
        { href: '/contact', label: '聯絡我' }
    ];

    // pathname 在建置後會帶結尾斜線（如 /about/），文章頁則是 /blog/xxx/
    const isActive = (href: string) =>
        pathname === href || pathname.startsWith(`${href}/`);

    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-black/80 border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-6 lg:px-8 py-4">
                <nav className="flex justify-between items-center">
                    {/* Logo */}
                    <MotionWrapper
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <a
                            href="/"
                            className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            ZRE
                        </a>
                    </MotionWrapper>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-1">
                        {navItems.map((item) => (
                            <MotionWrapper
                                key={item.href}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <a
                                    href={item.href}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                        isActive(item.href)
                                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                                >
                                    {item.label}
                                </a>
                            </MotionWrapper>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <MotionWrapper
                        type="button"
                        className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? '關閉選單' : '開啟選單'}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-nav"
                    >
                        {isMenuOpen ? (
                            <HiOutlineXMark className="w-6 h-6" />
                        ) : (
                            <HiOutlineBars3 className="w-6 h-6" />
                        )}
                    </MotionWrapper>
                </nav>

                {/* Mobile Navigation */}
                <MotionWrapper
                    id="mobile-nav"
                    className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: isMenuOpen ? 1 : 0, height: isMenuOpen ? 'auto' : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="mt-4 space-y-1">
                        {navItems.map((item) => (
                            <MotionWrapper
                                key={item.href}
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <a
                                    href={item.href}
                                    className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                        isActive(item.href)
                                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </a>
                            </MotionWrapper>
                        ))}
                    </div>
                </MotionWrapper>
            </div>
        </header>
    );
}
