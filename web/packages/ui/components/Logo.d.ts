import React from 'react';
interface LogoProps {
    href?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'text-only' | 'icon-only';
    className?: string;
    brandColor?: string;
    companyName?: string;
}
declare const Logo: React.FC<LogoProps>;
export default Logo;
