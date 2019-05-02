import { InputOption } from './input-option'

export class InputBase{
    type: string;
    defaultValue: string | boolean | Date;
    name: string;
    order: number;
    options?: InputOption[];
    startDate?: Date;
    endDate?: Date;
}
