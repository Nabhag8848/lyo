import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FashnaiService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.fashn.ai/v1';
  private readonly webhookSecret: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    const apiKey = this.configService.get<string>('FASHN_AI_API_KEY');

    if (!apiKey) {
      throw new Error('API key is not configured');
    }

    this.apiKey = apiKey;

    const webhookSecret = this.configService.get<string>(
      'FASHNAI_WEBHOOK_SECRET'
    );

    if (!webhookSecret) {
      throw new Error('Webhook secret is not configured');
    }

    this.webhookSecret = webhookSecret;
  }

  async startTryon({
    modelImageUrl,
    garmentImageUrl,
    userId,
  }: {
    modelImageUrl: string;
    garmentImageUrl: string;
    userId: string;
  }): Promise<FashnaiTryonResponse> {
    const requestData: FashnaiTryonRequest = {
      model_name: 'tryon-v1.6',
      inputs: {
        model_image: modelImageUrl,
        garment_image: garmentImageUrl,
        output_format: 'jpeg',
        return_base64: true,
      },
    };

    const config: AxiosRequestConfig<FashnaiTryonRequest> = {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const serverUrl = this.configService.get<string>('SERVER_URL');

    if (!serverUrl) {
      throw new Error('SERVER_URL is not configured');
    }

    const webhookUrl = `${serverUrl}/v1/webhook/fashnai/gen?secret=${this.webhookSecret}&user_id=${userId}`;
    const url = new URL(`${this.baseUrl}/run`);
    url.searchParams.set('webhook_url', webhookUrl);

    const response = await firstValueFrom(
      this.httpService.post<FashnaiTryonResponse, FashnaiTryonRequest>(
        url.toString(),
        requestData,
        config
      )
    );
    return response.data;
  }
}
