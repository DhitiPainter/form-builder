import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
    constructor(private snackService: MatSnackBar) { }

    notify(message: string) {
        this.snackService.open(message, null,
            { horizontalPosition: 'right', verticalPosition: 'top', duration: 2000, panelClass: 'amber' }
        );
    }
}