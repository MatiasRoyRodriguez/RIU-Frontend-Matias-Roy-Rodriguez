import { finalize, Observable } from "rxjs";
import { LoadingService } from "../../core/services/loading.service";

export function withFakeLoading<T>(obs: Observable<T>, loadingService: LoadingService): Observable<T> {
  loadingService.show();
  return obs.pipe(finalize(() => loadingService.hide()));
}
