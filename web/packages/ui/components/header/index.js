'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '@hanzo/ui/util';
import DesktopHeader from './desktop';
import MobileHeader from './mobile';
const Header = ({ siteDef, className }) => {
    return (_jsxs(_Fragment, { children: [_jsx(DesktopHeader, { siteDef: siteDef, className: cn('hidden md:flex', className) }), _jsx(MobileHeader, { siteDef: siteDef, className: cn('flex md:hidden', className) })] }));
};
export default Header;
