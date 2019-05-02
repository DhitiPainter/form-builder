import * as FileSaver from 'file-saver';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
export const downloadExcel = function (link: string, downloadFileName: string, jwtToken: string, model: any,
) { // spinnerService: Ng4LoadingSpinnerService
    // spinnerService.show();
    const req = new XMLHttpRequest();
    req.open('POST', link, true);
    req.setRequestHeader('Authorization', 'Bearer ' + jwtToken);
    req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    req.responseType = 'blob';
    req.onload = function (event) {
        const blob = new Blob([req.response], { type: 'application/vnd.openxmlformats' });
        FileSaver.saveAs(blob, downloadFileName);
        // spinnerService.hide();
    };
    req.send(JSON.stringify(model));
};
