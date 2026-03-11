import { AuthGuard } from '@nestjs/passport';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class JwtAuthGuard extends AuthGuard('jwt') {}
