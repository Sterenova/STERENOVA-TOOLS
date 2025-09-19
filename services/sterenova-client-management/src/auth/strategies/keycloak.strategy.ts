import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class KeycloakStrategy extends PassportStrategy(Strategy, 'keycloak') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      authorizationURL: `${configService.get<string>('keycloak.url')}/realms/${configService.get<string>('keycloak.realm')}/protocol/openid-connect/auth`,
      tokenURL: `${configService.get<string>('keycloak.url')}/realms/${configService.get<string>('keycloak.realm')}/protocol/openid-connect/token`,
      clientID: configService.get<string>('keycloak.clientId'),
      clientSecret: configService.get<string>('keycloak.clientSecret'),
      callbackURL: '/auth/keycloak/callback',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
    // This strategy is mainly for reference
    // In practice, we use JWT tokens from Keycloak
    return {
      accessToken,
      refreshToken,
      profile,
    };
  }
}