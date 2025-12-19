import {
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { FashnaiWebhookStatus } from '@/engine/webhook/fashnai/enum';

interface ValidateFieldByStatusOptions extends ValidationOptions {
  requiredWhen?: FashnaiWebhookStatus;
  forbiddenWhen?: FashnaiWebhookStatus;
  oppositeField?: string;
}

@ValidatorConstraint({ name: 'validateFieldByStatus', async: false })
class ValidateFieldByStatusConstraint implements ValidatorConstraintInterface {
  validate(value: unknown, args: ValidationArguments): boolean {
    const options = args.constraints[0] as ValidateFieldByStatusOptions;
    const object = args.object as {
      status: FashnaiWebhookStatus;
      output?: unknown;
      error?: unknown;
    };
    const currentStatus = object.status;

    // Check if field is required for current status
    if (options.requiredWhen && currentStatus === options.requiredWhen) {
      // Field must exist
      if (value === null || value === undefined) {
        return false;
      }

      // Also check that opposite field doesn't exist
      if (options.oppositeField) {
        const oppositeValue =
          object[options.oppositeField as keyof typeof object];
        if (oppositeValue !== null && oppositeValue !== undefined) {
          return false;
        }
      }

      return true;
    }

    // Check if field is forbidden for current status
    if (options.forbiddenWhen && currentStatus === options.forbiddenWhen) {
      // Field must not exist
      if (value !== null && value !== undefined) {
        return false;
      }

      // Also check that opposite field exists (if it's required for this status)
      if (options.oppositeField) {
        const oppositeValue =
          object[options.oppositeField as keyof typeof object];
        // If we're validating output and status is FAILED, error should exist
        // If we're validating error and status is COMPLETED, output should exist
        if (oppositeValue === null || oppositeValue === undefined) {
          return false;
        }
      }

      return true;
    }

    // If status doesn't match either condition, validation passes
    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    const options = args.constraints[0] as ValidateFieldByStatusOptions;
    const propertyName = args.property;
    const object = args.object as {
      status: FashnaiWebhookStatus;
      output?: unknown;
      error?: unknown;
    };
    const currentStatus = object.status;

    if (options.requiredWhen && currentStatus === options.requiredWhen) {
      // Check if the issue is with the opposite field
      if (options.oppositeField) {
        const oppositeValue =
          object[options.oppositeField as keyof typeof object];
        if (oppositeValue !== null && oppositeValue !== undefined) {
          return `${options.oppositeField} must not be present when status is ${options.requiredWhen}`;
        }
      }
      return `${propertyName} is required when status is ${options.requiredWhen}`;
    }

    if (options.forbiddenWhen && currentStatus === options.forbiddenWhen) {
      // Check if the issue is with the opposite field
      if (options.oppositeField) {
        const oppositeValue =
          object[options.oppositeField as keyof typeof object];
        if (oppositeValue === null || oppositeValue === undefined) {
          return `${options.oppositeField} is required when status is ${options.forbiddenWhen}`;
        }
      }
      return `${propertyName} must not be present when status is ${options.forbiddenWhen}`;
    }

    return `${propertyName} validation failed`;
  }
}

export function ValidateFieldByStatus(
  options: ValidateFieldByStatusOptions
): PropertyDecorator {
  return function (object: object, propertyName: string | symbol) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName as string,
      options: options,
      constraints: [options],
      validator: ValidateFieldByStatusConstraint,
    });
  };
}
