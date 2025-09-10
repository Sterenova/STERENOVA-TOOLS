import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Get('hello')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Protected endpoint' })
  @ApiResponse({ status: 200, description: 'Hello message' })
  getHello(@Request() req) {
    const user = req.user;
    return {
      message: `Hello ${user.username} from NestJS!`,
      user: {
        userId: user.userId,
        username: user.username,
        email: user.email,
        roles: user.roles,
      },
      timestamp: new Date().toISOString(),
    };
  }

  @Get('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin only endpoint' })
  @ApiResponse({ status: 200, description: 'Admin access granted' })
  getAdmin(@Request() req) {
    return {
      message: `Admin access granted for ${req.user.username}`,
      service: 'backend-nestjs-template',
      timestamp: new Date().toISOString(),
    };
  }
}
