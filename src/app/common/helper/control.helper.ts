export class ControlHelper {
    static navigateToURL(url: string): string {
        return url.indexOf('http') < 0 ? 'http://' + url : url;
    }
}
