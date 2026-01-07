import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionFilter.name);
    
    catch(exception: unknown, host: ArgumentsHost) {
        this.logger.error(exception);
        
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        const message = exception instanceof HttpException
            ? exception.getResponse()
            : this.analyzeError(exception);

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            error: typeof message === 'string' ? message : (message as any).message,
        });
    }
    analyzeError(exception: any) {
        const parsed = JSON.parse(JSON.stringify(exception));
        if (parsed["driverError"] != null) {
            return parsed["driverError"]["detail"]
        } else {
            return "Internal server error"
        }
    }
}
