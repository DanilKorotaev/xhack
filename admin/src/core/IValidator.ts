export interface IValidator<T> {
    (fields: Array<T>): Promise<boolean>;
}