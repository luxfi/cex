// Common legal links
export const legal = [
    { href: '/privacy', title: 'Privacy' },
    { href: '/terms', title: 'Terms' },
    { href: '/cookies', title: 'Cookies' }
];
// BAV site definition (legacy)
export const bavSiteDef = {
    currentAs: '',
    companyName: 'BeyondEquity',
    brandColor: '#D4AF37',
    nav: {
        common: [
            { href: '/', title: 'Home' },
            { href: '/about', title: 'About' },
            { href: '/portfolio', title: 'Portfolio' },
            { href: '/team', title: 'Team' },
            { href: '/news', title: 'News' },
            { href: '/contact', title: 'Contact' }
        ]
    },
    footer: [
        [
            { href: '/about', title: 'About Us', variant: 'linkFG' },
            { href: '/invest', title: 'Investment Philosophy' },
            { href: '/portfolio', title: 'Portfolio' },
            { href: '/team', title: 'Team' }
        ],
        [
            { href: '/news', title: 'News & Updates', variant: 'linkFG' },
            { href: '/contact', title: 'Contact' },
            { href: '/institutional', title: 'For Institutions' }
        ],
        [
            { href: 'https://twitter.com/beyondalpha', title: 'Twitter', newTab: true, variant: 'linkFG' },
            { href: 'https://linkedin.com/company/beyondalpha', title: 'LinkedIn', newTab: true },
            { href: 'https://github.com/beyondalpha', title: 'GitHub', newTab: true }
        ]
    ],
    aboveCopyright: legal
};
// BEGM (Beyond Equity Markets) site definition
export const begmSiteDef = {
    currentAs: '',
    companyName: 'Beyond Equity Markets',
    brandColor: '#10B981', // Green for trading platform
    nav: {
        common: [
            { href: '/', title: 'Home' },
            { href: '/markets', title: 'Markets' },
            { href: '/trade', title: 'Trade' },
            { href: '/portfolio', title: 'Portfolio' },
            { href: '/learn', title: 'Learn' },
            { href: '/about', title: 'About' }
        ]
    },
    footer: [
        [
            { href: '/markets', title: 'Markets', variant: 'linkFG' },
            { href: '/stocks', title: 'Stocks' },
            { href: '/crypto', title: 'Crypto' },
            { href: '/options', title: 'Options' },
            { href: '/commodities', title: 'Commodities' }
        ],
        [
            { href: '/learn', title: 'Education', variant: 'linkFG' },
            { href: '/learn/crypto', title: 'Crypto Trading' },
            { href: '/learn/options', title: 'Options Trading' },
            { href: '/learn/optimization', title: 'Portfolio Optimization' }
        ],
        [
            { href: '/about', title: 'Company', variant: 'linkFG' },
            { href: '/pricing', title: 'Pricing' },
            { href: '/contact', title: 'Contact' },
            { href: '/api', title: 'API' }
        ]
    ],
    aboveCopyright: legal
};
