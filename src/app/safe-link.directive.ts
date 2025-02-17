import { Directive, ElementRef, inject, input } from "@angular/core";

@Directive({
    selector: 'a[appSafeLink]',
    standalone: true,
    host: {
        '(click)': 'onConfirmLeavePage($event)'
    }

})

export class SafeLinkDirective{
    queryParam = input('my-app');

    private hostElement = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

    constructor(){ 
        console.log("safeLinkDirective is active!");
    }

    onConfirmLeavePage(event: MouseEvent){
        const wantsToLeave = window.confirm("Do you want to leave the app?");

        if (wantsToLeave){
            const address = this.hostElement.nativeElement.href;
            if (address === 'https://www.google.com/'){
                this.hostElement.nativeElement.href = address + this.queryParam();
            }else{
                this.hostElement.nativeElement.href = address + '?from=' + this.queryParam();
            }
            return;
        }

        event.preventDefault();

    }
}