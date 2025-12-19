import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FashnaiService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.fashn.ai/v1';

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    const apiKey = this.configService.get<string>('FASHN_AI_API_KEY');

    if (!apiKey) {
      throw new Error('API key is not configured');
    }

    this.apiKey = apiKey;
  }

  async startTryon({
    modelImageUrl,
    garmentImageUrl,
  }: {
    modelImageUrl: string;
    garmentImageUrl: string;
  }): Promise<FashnaiTryonResponse> {
    const requestData: FashnaiTryonRequest = {
      model_name: 'tryon-v1.6',
      inputs: {
        model_image: modelImageUrl,
        garment_image: garmentImageUrl,
      },
      output_format: 'jpeg',
      return_base64: true,
    };

    const config: AxiosRequestConfig<FashnaiTryonRequest> = {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const response = await firstValueFrom(
      this.httpService.post<FashnaiTryonResponse, FashnaiTryonRequest>(
        `${this.baseUrl}/run`,
        requestData,
        config
      )
    );
    return response.data;
  }
}
