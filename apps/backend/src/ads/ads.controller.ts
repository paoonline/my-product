import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { adsProps } from './ads.type';
import { Response } from 'express';

@Controller('/ads')
export class AdsController {
  ads: adsProps[];
  constructor() {
    this.ads = [
      { adId: 1, clicks: 100, impressions: 10000, cost: 50.0 },
      { adId: 2, clicks: 150, impressions: 2000, cost: 75.0 },
    ];
  }

  @Get()
  getAds(@Res() res: Response) {
    try {
      return res.status(HttpStatus.OK).json(this.ads);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error fetching ads' });
    }
  }

  @Post()
  addAd(@Body() adData:adsProps, @Res() res:Response) {
    const {adId, clicks, impressions, cost} = adData
    try {
      if (!adId || !clicks || !impressions || !cost) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Missing ad data fields' });
      }

      this.ads.push(adData);
      return res.status(HttpStatus.CREATED).json({ message: 'Ad added successfully', ad: adData });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error adding ad' });
    }
  }
}
