import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '.dropdown',
})
export class DropdownDirective {

    @HostBinding('class.open') _open: boolean = false;

    isOpen() { return this._open; }

    open() {
        this._open = true;
    }

    close() {
        this._open = false;
    }

    toggle() {
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
    }
}


@Directive({
    selector: '.dropdown-toggle',
})
export class DropdownToggleDirective {
    private _open = false;
    @HostBinding('class.icon-arrow-up') up: boolean = !this._open;
    @HostBinding('class.icon-arrow-down') down: boolean = this._open;
    
    constructor(private dropdown: DropdownDirective) {
        
    }

    @HostListener('click', ['$event'])
    toggleOpen($event: any) {
        $event.preventDefault();
        this.up = this.dropdown.isOpen();
        this.down = !this.dropdown.isOpen();
        this.dropdown.toggle();
    }
}

export const DROPDOWN_DIRECTIVES = [DropdownDirective, DropdownToggleDirective];

