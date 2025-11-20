'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from 'next/link';
import { cn } from '@hanzo/ui/util';
import Logo from '../Logo';
const DesktopHeader = ({ siteDef, className }) => {
    const { nav, companyName, brandColor } = siteDef;
    return (_jsx("header", { className: cn('sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60', className), children: _jsxs("div", { className: "container flex h-16 items-center justify-between px-4", children: [_jsx(Logo, { companyName: companyName, brandColor: brandColor }), _jsx("nav", { className: "flex items-center gap-6", children: nav.common.map((link, index) => (_jsx(Link, { href: link.href, className: "text-sm font-medium text-foreground/60 transition-colors hover:text-foreground", children: link.title }, index))) }), _jsx("div", { className: "flex items-center gap-4" })] }) }));
};
export default DesktopHeader;
