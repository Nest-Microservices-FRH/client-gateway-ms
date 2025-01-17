import { ArgumentsHost, Catch, RpcExceptionFilter, UnauthorizedException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements RpcExceptionFilter<RpcException> {
    catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
        throw new UnauthorizedException('Algo por poner aqui');
    }
}