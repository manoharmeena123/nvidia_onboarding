import { ChangeEvent } from 'react';

export function createChangeEvent(name: string, value: string): ChangeEvent<HTMLInputElement> {
  return {
    target: { name, value } 
  } as ChangeEvent<HTMLInputElement>;
}
