import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidateException } from '../exceptions/validate.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const object = plainToClass(metadata.metatype, value);
    const errors = await validate(object);

    if (errors.length) {
      const messages = errors.map(
        (error) => `${error.property} - ${Object.values(error.constraints).join(', ')}`,
      );
      throw new ValidateException(messages);
    }

    return value;
  }
}
