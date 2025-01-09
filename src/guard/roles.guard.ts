import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const allowedRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!allowedRoles) {
            return true; // No roles specified, allow access
        }

        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (!authHeader) {
            throw new UnauthorizedException('Authorization header is missing');
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('Token is missing');
        }

        try {
            const secret = 'qwertyuiopasdfghjklzxcvbnm123456'
            const decoded: any = jwt.verify(token, secret);
        
            if (!decoded.role) {
                throw new UnauthorizedException('Role is missing in the token');
            }

            if (!allowedRoles.includes(decoded.role)) {
                throw new UnauthorizedException('You do not have the required role');
            }

            request.user = decoded;

            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
