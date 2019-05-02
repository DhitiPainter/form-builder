import * as FileSaver from 'file-saver';
export const downloadPdf = function(link: string, downloadFileName: string) {
  const req = new XMLHttpRequest();
  req.open('GET', link, true);
  req.responseType = 'blob';

  req.onload = function(event) {
    const blob = new Blob([req.response], { type: 'application/pdf' });
    FileSaver.saveAs(blob, downloadFileName);
  };
  req.send();
};
