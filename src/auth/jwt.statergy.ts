import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

@Injectable()
export class JwtStatergy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        '2598a2d49fb67691e4d548b0fdc57769dad63cf192f976082c7a32464504c4ac639962dc16fe20cbecd442759002406ef2e2e692c16d7b5ed755af02fbd7643d5012aa06f97fad65d614c1c4d37d3c84d028972fa4a3a65cc944b224fc0143bcf59b6955b795007b84d2a4e994a360368460819a601d7e75931a40ed5b39e680ee8aede61fd773c4351c211e9d2c094c32f8f5f6fdbbbc21df2574906c89935441ccbbb653a42f7b187297f3421c80e45f87b1c2368bff88a1a02a85736d44c759f1dec38bc027df4800088e86a80dad0e87fe4d9813b1d27d079744fddc484fc005084ef8be2fa990a7f99ba575175a6e92f2de61971ca9a3d6d73ca3575b5c',
    });
  }
  validate(payload: JwtPayload) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
