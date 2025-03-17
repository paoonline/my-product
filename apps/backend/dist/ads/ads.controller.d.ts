import { adsProps } from './ads.type';
import { Response } from 'express';
export declare class AdsController {
    ads: adsProps[];
    constructor();
    getAds(res: Response): Response<any, Record<string, any>>;
    addAd(adData: adsProps, res: Response): Response<any, Record<string, any>>;
}
