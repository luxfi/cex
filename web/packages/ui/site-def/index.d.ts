import type { LinkDef } from '@hanzo/ui/types';
export interface SiteDef {
    currentAs: string;
    nav: {
        common: LinkDef[];
    };
    footer: LinkDef[][];
    aboveCopyright?: LinkDef[];
    companyName: string;
    brandColor: string;
    logo?: {
        src: string;
        alt: string;
    };
}
export declare const legal: LinkDef[];
export declare const bavSiteDef: SiteDef;
export declare const luxSiteDef: SiteDef;
export type { LinkDef };
