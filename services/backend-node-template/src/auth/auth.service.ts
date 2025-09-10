import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { createRemoteJWKSet, jwtVerify } from 'jose';

@Injectable()
export class AuthService {
  private jwks: any;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.initializeJWKS();
  }

  private async initializeJWKS() {
    const jwksUrl = this.configService.get('OIDC_JWKS_URL');
    if (jwksUrl) {
      this.jwks = createRemoteJWKSet(new URL(jwksUrl));
    }
  }

  async validateToken(token: string): Promise<any> {
    if (!this.jwks) {
      throw new UnauthorizedException('JWKS not available');
    }

    try {
      const expectedAud = this.configService.get('OIDC_AUDIENCE');
      const { payload } = await jwtVerify(token, this.jwks, {
        algorithms: ['RS256'],
        audience: expectedAud,
      });

      return {
        sub: payload.sub,
        preferred_username: payload.preferred_username,
        email: payload.email,
        roles: (payload as any).realm_access?.roles || [],
        aud: payload.aud,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async generateJwt(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }
}
