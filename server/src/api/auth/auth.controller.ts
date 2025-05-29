import {
   Body,
   Controller,
   Get,
   HttpCode,
   HttpStatus,
   Post,
   Query,
   Req,
   Res,
   UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
   OnBoardAdminDto,
   OnBoardMerchantDto,
   OnBoardCustomerDto,
} from './dto/register.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SignInDto } from './dto/sign-in.dto';
import { IsPublic } from 'src/shared/decorators/auth.decorators';
import { Request, Response } from 'express';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { ConfigService } from '@nestjs/config';
import { GoogleUser } from './interfaces';
import { CredentialValidationPipe } from 'src/core/pipes';
import { RoleNames } from '../user/enums';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
   constructor(
      private readonly authService: AuthService,
      private readonly configService: ConfigService,
   ) { }

   @Post('/sign-up/customer')
   @IsPublic()
   @ApiOperation({ summary: 'Onboard Customer' })
   async onBoardCustomer(@Body() onBoardCustomerDto: OnBoardCustomerDto) {
      const data = await this.authService.onBoardCustomer(onBoardCustomerDto);

      return data;
   }

   @Post('/sign-up/merchant')
   @IsPublic()
   @ApiOperation({ summary: 'Onboard Merchant' })
   async onBoardMerchant(@Body() onBoardMerchantDto: OnBoardMerchantDto) {
      const data = await this.authService.onBoardMerchant(onBoardMerchantDto);

      return data;
   }

   // @Post('/signup/admin')
   // @IsPublic()
   // async onBoardAdmin(@Body() onBoardAdminDto: OnBoardAdminDto) {
   //    const data = await this.authService.onBoardAdmin(onBoardAdminDto);

   //    return data;
   // }

   @Post('/verify-email')
   @IsPublic()
   @HttpCode(HttpStatus.OK)
   @ApiOperation({ summary: 'Verify email' })
   async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
      const data = await this.authService.verifyEmail(verifyEmailDto);

      return data;
   }

   @Post('/verify-email/request')
   @IsPublic()
   @HttpCode(HttpStatus.OK)
   @ApiBody({
      schema: { type: 'object', properties: { email: { type: 'string' } } },
   })
   @ApiOperation({ summary: 'Request email verification' })
   async requestVerificationEmail(@Body('email') email: string) {
      const data = await this.authService.requestEmailVerificationLink(email);

      return data;
   }

   @Post('/forgot-password')
   @IsPublic()
   @HttpCode(HttpStatus.OK)
   @ApiBody({
      schema: { type: 'object', properties: { email: { type: 'string' } } },
   })
   @ApiOperation({ summary: 'Request password reset' })
   async forgotPassword(@Body('email') email: string) {
      const data = await this.authService.forgotPassword(email);

      return data;
   }

   @Post('/reset-password')
   @HttpCode(HttpStatus.OK)
   @IsPublic()
   @ApiOperation({ summary: 'Reset password' })
   async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
      const data = await this.authService.resetPassword(resetPasswordDto);

      return data;
   }

   @Post('/session/refresh')
   @IsPublic()
   @HttpCode(HttpStatus.OK)
   @ApiBody({
      schema: {
         type: 'object',
         properties: { refreshToken: { type: 'string' } },
      },
   })
   @ApiOperation({ summary: 'Refresh session' })
   async refreshSession(@Body('refreshToken') refreshToken: string) {
      const data = await this.authService.refreshSession(refreshToken);

      return data;
   }

   @Post('/sign-in')
   @IsPublic()
   @HttpCode(HttpStatus.OK)
   @ApiOperation({ summary: 'Sign in' })
   async signIn(@Body(CredentialValidationPipe) signInDto: SignInDto, @Res({ passthrough: true }) res: Response) {
      const { credential, credentialType, password, rememberMe } = signInDto;
      const data = await this.authService.signIn({ credential, credentialType, password, rememberMe });

      res.cookie('access_token', data.data.meta.accessToken, {
         maxAge: rememberMe ? 86400000 : 3600000,
         httpOnly: true,
         secure: true,
         sameSite: 'none',
         path: '/'
      });

      res.cookie('refresh_token', data.data.meta.refreshToken, {
         maxAge: 604800000,
         httpOnly: true,
         secure: true,
         sameSite: 'none',
         path: '/'
      });

      return data;
   }

   // @IsPublic()
   // @HttpCode(HttpStatus.OK)
   // @Post('token-sign-in')
   // @ApiOperation({ summary: 'Sign in with token' })
   // async signInWithToken(
   //    @Res() res: Response,
   //    @Body() verifyEmailDto: VerifyEmailDto,
   // ) {
   //    const data = await this.authService.signInWithToken(verifyEmailDto);
   //    const access_token = data.data.meta.accessToken;
   //    const refresh_token = data.data.meta.refreshToken;
   //    res.cookie('access_token', access_token, {
   //       maxAge: 3600000,
   //       httpOnly: true,
   //       secure: true,
   //       sameSite: 'none',
   //    });

   //    res.cookie('refresh_token', refresh_token, {
   //       maxAge: 604800000,
   //       httpOnly: true,
   //       secure: true,
   //       sameSite: 'none',
   //    });

   //    return data;
   // }

   @Get('init-google')
   @IsPublic()
   async googleAuthInit(@Res() res: Response, @Query('role') role?: string) {
      if (role) {
         res.cookie('user_role', role, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
         });
      }

      res.redirect(this.configService.get<string>('GOOGLE_INIT_URL'));
   }


   @Get('google')
   @ApiExcludeEndpoint()
   @IsPublic()
   @UseGuards(GoogleOAuthGuard)
   async googleAuth() {
   }

   @Get('google/redirect')
   @IsPublic()
   @UseGuards(GoogleOAuthGuard)
   async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
      try {
         const role = req.cookies['user_role'] || RoleNames.CUSTOMER;
         const data = await this.authService.googleSignIn({ ...req.user as GoogleUser, role });

         // Clear the role cookie
         res.clearCookie('user_role');

         // Set auth cookies
         res.cookie('access_token', data.data.meta.accessToken, {
            maxAge: 86400000,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
         });

         res.cookie('refresh_token', data.data.meta.refreshToken, {
            maxAge: 604800000,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
         });

         return res.redirect(
            `${this.configService.get<string>('FRONTEND_URL')}/${data.data.user.role}/${data.data.user.role === 'customer' ? 'home' : 'dashboard'}?auth=success`
         );
      } catch (error) {
         return res.redirect(
            `${this.configService.get<string>('FRONTEND_URL')}/login?error=google-auth-failed`
         );
      }
   }
}
