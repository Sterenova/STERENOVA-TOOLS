import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: async (request, rawJwtToken, done) => {
        try {
          const keycloakUrl = this.configService.get<string>('KEYCLOAK_URL');
          const realm = this.configService.get<string>('KEYCLOAK_REALM');
          
          // Get public key from Keycloak
          const response = await fetch(
            `${keycloakUrl}/realms/${realm}/protocol/openid-connect/certs`
          );
          const jwks = await response.json();
          
          // Decode token to get kid
          const decoded = JSON.parse(Buffer.from(rawJwtToken.split('.')[0], 'base64').toString());
          const kid = decoded.kid;
          
          // Find matching key
          const key = jwks.keys.find(k => k.kid === kid);
          if (!key) {
            return done(new Error('Key not found'), null);
          }
          
          // Convert JWK to PEM
          const pem = this.jwkToPem(key);
          return done(null, pem);
        } catch (error) {
          return done(error, null);
        }
      },
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  private jwkToPem(jwk: any): string {
    // Simple JWK to PEM conversion for RS256 keys
    // In production, use a proper library like node-jose
    const key = {
      kty: jwk.kty,
      n: jwk.n,
      e: jwk.e,
    };
    
    // This is a simplified conversion - use proper library in production
    return `-----BEGIN PUBLIC KEY-----\n${key.n}\n-----END PUBLIC KEY-----`;
  }
}
