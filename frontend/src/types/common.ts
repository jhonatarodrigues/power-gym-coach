export type ID = string;

export type ISODateString = string;

export type ISODateTimeString = string;

export interface SelectOption<TValue extends string = string> {
  label: string;
  value: TValue;
}
