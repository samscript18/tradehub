import {
   BadRequestException,
   ForbiddenException,
   Injectable,
   NotFoundException,
   UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Jwt, JwtDocument } from './schema/jwt.schema';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import {
   OnBoardApplicantDto, OnBoardDeveloperDto,
   OnBoardAdminDto,
   RegisterDto,
} from './dto/register.dto';
import { UtilService } from 'src/shared/services/utils.service';
import { TokenService } from '../token/token.service';
import { TokenTypes } from '../token/enums';
import { MailService } from 'src/shared/mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UserDocument } from '../user/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { JwtType } from './enums/jwt.enum';
import { RoleNames } from '../user/enums';
import { ApplicantService } from '../applicant/applicant.service';
import { DeveloperService } from '../developer/developer.service';
import { FileService } from 'src/shared/file/file.service';
import { ApplicantDocument } from '../applicant/schema/applicant.schema';
import { DeveloperDocument } from '../developer/schema/developer.schema';

@Injectable()
export class AuthService {
   constructor(
      @InjectModel(Jwt.name) private readonly _jwtModel: Model<JwtDocument>,
      private readonly userService: UserService,
      private readonly utilService: UtilService,
      private readonly fileService: FileService,
      private readonly tokenService: TokenService,
      private readonly mailService: MailService,
      private readonly configService: ConfigService,
      private readonly jwtService: JwtService,
      private readonly applicantService: ApplicantService,
      private readonly developerService: DeveloperService,
   ) { }

   private async auth(user: UserDocument) {
      const ONE_HOUR = 1000 * 60 * 60;
      const accessToken = await this.jwtService.signAsync(user, {
         expiresIn: '1h',
      });
      const refreshToken = await this.jwtService.signAsync(user, {
         expiresIn: '7d',
      });

      await this._jwtModel.updateOne(
         { user: user._id, type: JwtType.access },
         { token: accessToken },
         { upsert: true },
      );
      await this._jwtModel.updateOne(
         { user: user._id, type: JwtType.refresh },
         { token: refreshToken },
         { upsert: true },
      );

      return {
         user,
         meta: {
            accessToken,
            refreshToken,
            lifeSpan: ONE_HOUR,
         },
      };
   }

   async signUp(signUpDto: RegisterDto, { role, applicantFirstName, developerCompanyName }: { role: string, applicantFirstName?: string, developerCompanyName?: string }): Promise<UserDocument> {
      const userExists = await this.userService.getUser({
         $or: [
            {
               email: signUpDto.email,
            },
            { phoneNumber: signUpDto.phoneNumber },
         ],
      });

      if (userExists) {
         throw new BadRequestException(
            'Oops! A user with this email or phone number already exists',
         );
      }

      signUpDto.password = await this.utilService.hashPassword(
         signUpDto.password,
      );

      const user = await this.userService.createUser(signUpDto);

      const token = await this.tokenService.findOrCreateToken({
         email: user.email,
         value: this.utilService.generateToken(),
         type: TokenTypes.accountVerification,
      });

      const link = `${this.configService.get('FRONTEND_URL')}/account/verify?email=${token.email}&token=${token.value}`;

      await this.mailService.sendMail({
         to: user.email,
         subject: 'Her-Homes: Account Verification',
         template: 'account-verification',
         context: {
            firstName: role === RoleNames.APPLICANT ? applicantFirstName : developerCompanyName,
            link,
         },
      });

      return user;
   }

   async onBoardApplicant(onBoardApplicantDto: OnBoardApplicantDto) {
      onBoardApplicantDto.role = RoleNames.APPLICANT;
      const user = await this.signUp(onBoardApplicantDto, { role: RoleNames.APPLICANT, applicantFirstName: onBoardApplicantDto.firstName });

      await this.applicantService.createApplicant({ ...onBoardApplicantDto, user: user._id });

      return {
         success: true,
         message: 'Verification email sent 🪁',
      };
   }

   async onBoardDeveloper(onBoardDeveloperDto: OnBoardDeveloperDto) {
      onBoardDeveloperDto.role = RoleNames.DEVELOPER;
      const user = await this.signUp(onBoardDeveloperDto, { role: RoleNames.DEVELOPER, developerCompanyName: onBoardDeveloperDto.companyName });

      const { url } = await this.fileService.uploadResource(onBoardDeveloperDto.companyLogo, { resource_type: 'image' });
      onBoardDeveloperDto.companyLogo = url;

      await this.developerService.createDeveloper({
         ...onBoardDeveloperDto,
         user: user._id,
      });

      return {
         success: true,
         message: 'Verification email sent 🪁',
      };
   }

   async verifyEmail(verifyEmailDto: VerifyEmailDto) {
      const token = await this.tokenService.getToken({
         email: verifyEmailDto.email,
         value: verifyEmailDto.token,
         type: TokenTypes.accountVerification,
      });

      if (!token)
         throw new NotFoundException(
            'Token is invalid, try to login to receive a new verification link',
         );

      await this.userService.updateUser(
         { email: token.email },
         { emailVerified: true },
      );
      await token.deleteOne();

      return {
         success: true,
         message: 'Account Verified 😉',
      };
   }

   async requestEmailVerificationLink(email: string) {
      const user = await this.userService.getUser({ email });
      let applicant: ApplicantDocument, developer: DeveloperDocument;

      if (!user)
         throw new NotFoundException("User with this email doesn't exist");
      if (user.emailVerified)
         throw new NotFoundException('This account is already verified');

      if (user.role === RoleNames.APPLICANT) {
         applicant = await this.applicantService.getApplicant({ user: user._id });
      } else if (user.role === RoleNames.DEVELOPER) {
         developer = await this.developerService.getDeveloper({ user: user._id });
      } else { console.log('admin') }

      const token = await this.tokenService.findOrCreateToken({
         email: user.email,
         value: this.utilService.generateToken(),
         type: TokenTypes.accountVerification,
      });

      const link = `${this.configService.get('FRONTEND_URL')}/account/verify?email=${token.email}&token=${token.value}`;

      await this.mailService.sendMail({
         to: user.email,
         subject: 'Her-Homes: Account Verification',
         template: 'account-verification',
         context: {
            firstName: user.role === RoleNames.APPLICANT ? applicant.firstName : developer.companyName,
            link,
         },
      });

      return {
         success: true,
         message: 'Verification Email Sent 🪁',
      };
   }

   async forgotPassword(email: string) {
      const user = await this.userService.getUser({ email });
      let applicant: ApplicantDocument, developer: DeveloperDocument;

      if (user.role === RoleNames.APPLICANT) {
         applicant = await this.applicantService.getApplicant({ user: user._id });
      } else if (user.role === RoleNames.DEVELOPER) {
         developer = await this.developerService.getDeveloper({ user: user._id });
      } else { console.log('admin') }

      if (user && (applicant || developer)) {
         const token = await this.tokenService.findOrCreateToken({
            email,
            type: TokenTypes.passwordReset,
            value: this.utilService.generateToken(),
         });

         const link = `${this.configService.get('FRONTEND_URL')}/reset-password?email=${token.email}&token=${token.value}`;

         await this.mailService.sendMail({
            to: user.email,
            subject: 'Her-Homes: Password Reset Request',
            template: 'forgot-password',
            context: {
               firstName: user.role === RoleNames.APPLICANT ? applicant.firstName : developer.companyName,
               link,
            },
         });
      }

      return {
         success: true,
         message: 'password reset link sent successfully',
      };
   }

   async resetPassword(resetPasswordDto: ResetPasswordDto) {
      const token = await this.tokenService.getToken({
         type: TokenTypes.passwordReset,
         value: resetPasswordDto.token,
         email: resetPasswordDto.email,
      });

      if (!token)
         throw new NotFoundException(
            'password reset link is invalid or has expired',
         );

      const hashedPassword = await this.utilService.hashPassword(
         resetPasswordDto.password,
      );

      await this.userService.updateUser(
         { email: token.email },
         { password: hashedPassword },
      );
      await token.deleteOne();

      return {
         success: true,
         message: 'password reset successful',
      };
   }

   async signIn(signInDto: SignInDto) {
      let user: UserDocument;

      if (signInDto.email) {
         user = await this.userService.getUser({ email: signInDto.email });
      } else if (signInDto.phoneNumber) {
         user = await this.userService.getUser({
            phoneNumber: signInDto.phoneNumber,
         });
      }

      if (!user) throw new UnauthorizedException('Invalid login credentials');

      const passwordMatch: boolean = await this.utilService.comparePassword(
         signInDto.password,
         user.password,
      );
      if (!passwordMatch)
         throw new UnauthorizedException('Invalid login credentials');
      if (!user.emailVerified)
         throw new BadRequestException('Email not verified');

      const data = await this.auth(this.utilService.excludePassword(user));

      return {
         success: true,
         message: 'sign in successful',
         data,
      };
   }

   async signInWithToken(verifyEmailDto: VerifyEmailDto) {
      await this.verifyEmail(verifyEmailDto);
      const user: UserDocument = await this.userService.getUser({ email: verifyEmailDto.email });
      if (!user) {
         throw new NotFoundException('User does not exist');
      }

      const data = await this.auth(this.utilService.excludePassword(user));

      return {
         success: true,
         message: 'sign in successful',
         data,
      };
   }

   async refreshSession(refreshToken: string) {
      const verifiedToken = await this.jwtService.verifyAsync(refreshToken);
      if (!verifiedToken) {
         throw new ForbiddenException('your session is invalid or has expired');
      }
      const jwtToken = await this._jwtModel.findOne({
         type: JwtType.refresh,
         token: refreshToken,
      });

      if (!jwtToken) {
         throw new ForbiddenException('your session is invalid or has expired');
      }

      const user = await this.userService.getUser({ _id: jwtToken.user });

      const accessToken = await this.jwtService.signAsync(
         this.utilService.excludePassword(user),
      );
      await this._jwtModel.updateOne(
         {
            type: JwtType.access,
            user: jwtToken.user,
         },
         { token: accessToken },
         { upsert: true },
      );

      return {
         success: true,
         message: 'session refreshed successfully',
         data: {
            accessToken,
            refreshToken,
         },
      };
   }

   async onBoardAdmin(onBoardAdminDto: OnBoardAdminDto) {
      onBoardAdminDto.role = RoleNames.ADMIN;
      onBoardAdminDto.password = await this.utilService.hashPassword(
         onBoardAdminDto.password,
      );

      const data = await this.userService.createUser({
         ...onBoardAdminDto,
         emailVerified: true,
      });

      return {
         success: true,
         message: 'admin created',
      };
   }

   async googleSignIn(googleUser: { email: string, firstName: string, lastName: string, profilePicture: string, role: string }) {
      const user = await this.userService.findOrCreateUser({ email: googleUser.email }, { email: googleUser.email, profilePicture: googleUser.profilePicture, role: googleUser.role, emailVerified: true });

      let existingUser: ApplicantDocument | DeveloperDocument;
      if (googleUser.role === RoleNames.APPLICANT) {
         existingUser = await this.applicantService.findOrCreateApplicant({ user: user._id }, { user: user._id, firstName: googleUser.firstName, lastName: googleUser.lastName })
      } else if (googleUser.role === RoleNames.DEVELOPER) {
         existingUser = await this.developerService.findOrCreateDeveloper({ user: user._id }, {
            user: user._id, companyName: `${googleUser.firstName} ${googleUser.lastName}`, companyLogo: googleUser.profilePicture
         });
      } else {
         throw new Error('Invalid role');
      }

      return await this.tokenService.findOrCreateToken({
         email: user.email || existingUser.user?.email,
         value: this.utilService.generateToken(),
         type: TokenTypes.accountVerification,
      });
   }
}
