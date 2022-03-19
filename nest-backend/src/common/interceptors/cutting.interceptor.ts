import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CuttingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const unnecessaryProps = [
            'hashedPassword',
            'createdAt',
            'updatedAt',
            'deletedAt'
        ];

        const removeProps = (obj, keys) => {
            if(obj instanceof Array){
              obj.forEach((item) => {
                removeProps(item,keys)
              });
            }
            else if(typeof obj === 'object' && obj !== null){
              Object.getOwnPropertyNames(obj).forEach((key) => {
                if( keys.indexOf(key) !== -1)
                  delete obj[key];
                else
                  removeProps(obj[key],keys);
              });
            }
          }

      return next
        .handle()
        .pipe(map(value => {
            removeProps(value, unnecessaryProps)
            return value
        } ));
    }
  }
