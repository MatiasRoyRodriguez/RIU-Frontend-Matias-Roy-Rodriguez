import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HeroService } from "../../features/heroes/services/hero.service";
import { ConfirmDialogComponent } from "../components/confirm-dialog/confirm-dialog.component";

export function confirmAndDeleteHero(
  dialog: MatDialog,
  snackBar: MatSnackBar,
  heroService: HeroService,
  id: number,
  onSuccess?: () => void
) {
  const dialogRef = dialog.open(ConfirmDialogComponent, {
    data: {
      title: 'Delete Hero',
      message: 'Are you sure you want to delete this hero?'
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      heroService.deleteHero(id).subscribe({
        next: () => {
          snackBar.open('Hero deleted successfully', 'Close', { duration: 3000 });
          onSuccess?.();
        },
        error: () => {
          snackBar.open('Failed to delete hero', 'Close', { duration: 3000 });
        }
      });
    }
  });
}
