'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@hanzo/ui/util';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../Logo';
const MobileHeader = ({ siteDef, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { nav, companyName, brandColor } = siteDef;
    return (_jsxs("header", { className: cn('sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60', className), children: [_jsxs("div", { className: "container flex h-16 items-center justify-between px-4", children: [_jsx(Logo, { companyName: companyName, brandColor: brandColor, size: "sm" }), _jsx("button", { onClick: () => setIsOpen(!isOpen), className: "p-2 text-foreground", "aria-label": "Toggle menu", children: isOpen ? _jsx(X, { size: 24 }) : _jsx(Menu, { size: 24 }) })] }), _jsx(AnimatePresence, { children: isOpen && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, transition: { duration: 0.2 }, className: "border-b bg-background", children: _jsx("nav", { className: "container flex flex-col gap-4 px-4 py-6", children: nav.common.map((link, index) => (_jsx(Link, { href: link.href, onClick: () => setIsOpen(false), className: "text-lg font-medium text-foreground/60 transition-colors hover:text-foreground", children: link.title }, index))) }) })) })] }));
};
export default MobileHeader;
