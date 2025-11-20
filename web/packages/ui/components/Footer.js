import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { NavItems } from '@hanzo/ui/primitives';
import { cn } from '@hanzo/ui/util';
import Logo from './Logo';
import { legal } from '../site-def';
const Copyright = ({ className }) => {
    const year = new Date().getFullYear();
    return (_jsxs("div", { className: className, children: ["\u00A9 ", year, " Beyond Equity Global Marketplace LLC. All rights reserved."] }));
};
const Footer = ({ siteDef, className = '', noHorizPadding = false }) => {
    const { footer, aboveCopyright, companyName, brandColor } = siteDef;
    const smGridCols = Math.floor(footer.length / 2);
    const smGridColsClx = `sm:grid-cols-${smGridCols} `;
    const _aboveCopyright = aboveCopyright ?? legal;
    return (_jsxs("footer", { className: cn('grow flex flex-col justify-between gap-6 pb-[2vh] bg-secondary', className), children: [_jsxs("div", { className: (noHorizPadding ? '' : 'px-5 md:px-8 ') +
                    'grid grid-cols-2 gap-4 gap-y-6 md:gap-x-6 lg:gap-8 ' +
                    smGridColsClx +
                    'md:w-full sm:justify-items-center md:mx-0 lg:w-full ' +
                    'md:flex md:flex-row md:justify-between px-[24px] pt-8', children: [_jsx("div", { className: "hidden lg:flex flex-col", children: _jsx(Logo, { size: "md", variant: "text-only", companyName: companyName, brandColor: brandColor }) }, 0), footer.map((defs, index) => {
                        const xsColSpanClx = index === footer.length - 1 && footer.length % 2 === 1
                            ? 'xs:col-span-2 xs:mx-auto md:col-span-1 md:mx-0 '
                            : '';
                        return (_jsx(NavItems, { items: defs, currentAs: siteDef.currentAs, as: "nav", className: cn('sm:min-w-[150px] md:min-w-0 flex flex-col justify-start items-start ' +
                                'gap-[11px] sm:gap-[12px] md:gap-[15px]', xsColSpanClx), itemClx: (def) => def.variant === 'linkFG'
                                ? 'font-nav text-[15px]/[1.3] font-medium tracking-normal text-muted-foreground hover:text-foreground transition-colors duration-300'
                                : 'text-[15px]/[1.1] font-normal tracking-[0.2px] text-muted-foreground hover:text-foreground transition-colors duration-300' }, index + 1));
                    })] }), _jsxs("div", { className: "md:mt-[2vh]", children: [_aboveCopyright.length > 0 && (_jsx(NavItems, { items: _aboveCopyright, as: "div", className: "flex flex-row justify-center gap-4 mb-2", itemClx: "text-sm text-center text-muted-foreground underline hover:text-foreground" })), _jsx(Copyright, { className: "text-sm text-center text-muted-foreground" })] })] }));
};
export default Footer;
