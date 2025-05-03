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
   // OnBoardAdminDto,
   OnBoardDeveloperDto,
   OnBoardApplicantDto,
} from './dto/register.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Auth, IsPublic } from 'src/shared/decorators/auth.decorators';
import { Request, Response } from 'express';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../token/token.service';
import { TokenTypes } from '../token/enums';
import { UtilService } from 'src/shared/services/utils.service';
import { GoogleUser } from './interfaces';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
   constructor(
      private readonly authService: AuthService,
      private readonly configService: ConfigService,
      private readonly utilService: UtilService,
      private readonly tokenService: TokenService
   ) { }

   @Post('/signup/applicant')
   @IsPublic()
   @ApiOperation({ summary: 'Onboard applicant' })
   async onBoardApplicant(@Body() onBoardApplicantDto: OnBoardApplicantDto) {
      const data = await this.authService.onBoardApplicant(onBoardApplicantDto);

      return data;
   }

   @Post('/signup/developer')
   @IsPublic()
   @ApiOperation({ summary: 'Onboard developer' })
   async onBoardDeveloper(@Body() onBoardDeveloperDto: OnBoardDeveloperDto) {
      const data = await this.authService.onBoardDeveloper(onBoardDeveloperDto);

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

   @Post('/signin')
   @IsPublic()
   @HttpCode(HttpStatus.OK)
   @ApiOperation({ summary: 'Sign in' })
   async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
      const data = await this.authService.signIn(signInDto);
      const access_token = data.data.meta.accessToken;
      const refresh_token = data.data.meta.refreshToken;
      res.cookie('access_token', access_token, {
         maxAge: 3600000,
         httpOnly: true,
         secure: true,
         sameSite: 'none',
      });

      res.cookie('refresh_token', refresh_token, {
         maxAge: 604800000,
         httpOnly: true,
         secure: true,
         sameSite: 'none',
      });

      return data;
   }

   @IsPublic()
   @HttpCode(HttpStatus.OK)
   @Post('token-sign-in')
   @ApiOperation({ summary: 'Sign in with token' })
   async signInWithToken(
      @Res() res: Response,
      @Body() verifyEmailDto: VerifyEmailDto,
   ) {
      const data = await this.authService.signInWithToken(verifyEmailDto);
      const access_token = data.data.meta.accessToken;
      const refresh_token = data.data.meta.refreshToken;
      res.cookie('access_token', access_token, {
         maxAge: 3600000,
         httpOnly: true,
         secure: true,
         sameSite: 'none',
      });

      res.cookie('refresh_token', refresh_token, {
         maxAge: 604800000,
         httpOnly: true,
         secure: true,
         sameSite: 'none',
      });

      return data;
   }

   @Get('init-google')
   @IsPublic()
   async googleAuthInit(@Res() res: Response, @Query('role') role: string) {
      res.cookie('user_role', role, {
         httpOnly: true,
         secure: true,
         sameSite: 'lax',
      });

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
      const role = req.cookies['user_role'];
      const token = await this.authService.googleSignIn({ ...req.user as GoogleUser, role });

      res.clearCookie('user_role');

      res.redirect(
         `${this.configService.get<string>('FRONTEND_URL')}/google-auth/callback?email=${token.email}&token=${token.value}`,
      );
   }
}
