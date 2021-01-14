import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'formatPhone'})

export class FormatPhonePipe implements PipeTransform{

    constructor(private cdRef: ChangeDetectorRef) {}

    transform(value: number): string {
        if (!value) {
            return null;
        }
        const phone = value.toString().split('');
        return `+88 0${phone[0]}${phone[1]}-${phone[2]}${phone[3]}-${phone[4]}${phone[5]}-${phone[6]}${phone[7]}-${phone[8]}${phone[9]}`;
    }

}
