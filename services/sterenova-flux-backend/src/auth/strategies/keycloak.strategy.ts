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
    const keycloakUrl = configService.get<string>('KEYCLOAK_URL');
    const realm = configService.get<string>('KEYCLOAK_REALM');
    const clientId = configService.get<string>('KEYCLOAK_CLIENT_ID');
    const clientSecret = configService.get<string>('KEYCLOAK_CLIENT_SECRET');

    super({
      authorizationURL: `${keycloakUrl}/realms/${realm}/protocol/openid-connect/auth`,
      tokenURL: `${keycloakUrl}/realms/${realm}/protocol/openid-connect/token`,
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: 'http://localhost:3002/auth/keycloak/callback',
      scope: 'openid profile email',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    // Validate the access token with Keycloak
    const user = await this.authService.validateToken(accessToken);
    return user;
  }
}
