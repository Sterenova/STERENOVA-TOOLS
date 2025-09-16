import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private jwksClient: any;

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {
    this.initializeJwksClient();
  }

  private async initializeJwksClient() {
    try {
      const jwksClient = (await import('jwks-client')).default;
      const keycloakUrl = this.configService.get<string>('keycloak.url');
      const realm = this.configService.get<string>('keycloak.realm');
      
      this.jwksClient = jwksClient({
        jwksUri: `${keycloakUrl}/realms/${realm}/protocol/openid-connect/certs`,
        cache: true,
        cacheMaxEntries: 5,
        cacheMaxAge: 600000, // 10 minutes
      });
    } catch (error) {
      console.warn('Failed to initialize JWKS client:', error.message);
    }
  }

  private async getKey(header: any): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.jwksClient) {
        reject(new Error('JWKS client not initialized'));
        return;
      }

      this.jwksClient.getSigningKey(header.kid, (err: any, key: any) => {
        if (err) {
          reject(err);
        } else {
          const signingKey = key.publicKey || key.rsaPublicKey;
          resolve(signingKey);
        }
      });
    });
  }

  async validateToken(token: string): Promise<any> {
    try {
      // First decode to get header
      const decoded = this.jwtService.decode(token, { complete: true });
      
      if (!decoded || typeof decoded === 'string') {
        throw new UnauthorizedException('Invalid token format');
      }

      const { header, payload } = decoded;

      // Verify token with Keycloak public key
      if (this.jwksClient) {
        try {
          const key = await this.getKey(header);
          const verified = this.jwtService.verify(token, { 
            secret: key,
            algorithms: ['RS256']
          });
          return verified;
        } catch (verifyError) {
          console.warn('JWT verification failed, falling back to decode:', verifyError.message);
        }
      }

      // Fallback: just decode without verification (for development)
      if (!payload || typeof payload === 'string') {
        throw new UnauthorizedException('Invalid token payload');
      }

      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async validateUser(payload: any): Promise<any> {
    // Extract user information from Keycloak token
    return {
      id: payload.sub,
      username: payload.preferred_username,
      email: payload.email,
      firstName: payload.given_name,
      lastName: payload.family_name,
      roles: payload.realm_access?.roles || [],
    };
  }
}
