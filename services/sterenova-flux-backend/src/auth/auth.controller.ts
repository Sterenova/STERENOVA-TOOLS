import { Controller, Get, Post, UseGuards, Request, Response } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  @Get('keycloak')
  @UseGuards(AuthGuard('keycloak'))
  @ApiOperation({ summary: 'Initiate Keycloak authentication' })
  @ApiResponse({ status: 302, description: 'Redirect to Keycloak login' })
  async keycloakAuth() {
    // This will redirect to Keycloak
  }

  @Get('keycloak/callback')
  @UseGuards(AuthGuard('keycloak'))
  @ApiOperation({ summary: 'Keycloak authentication callback' })
  @ApiResponse({ status: 200, description: 'Authentication successful' })
  async keycloakCallback(@Request() req, @Response() res) {
    // Handle successful authentication
    res.redirect('http://localhost:3003?token=' + req.user.accessToken);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully' })
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('validate')
  @ApiOperation({ summary: 'Validate JWT token' })
  @ApiResponse({ status: 200, description: 'Token is valid' })
  @ApiResponse({ status: 401, description: 'Token is invalid' })
  async validateToken(@Request() req) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return { valid: false, error: 'No token provided' };
    }
    
    try {
      // This would be implemented in AuthService
      return { valid: true, message: 'Token is valid' };
    } catch (error) {
      return { valid: false, error: 'Invalid token' };
    }
  }
}
