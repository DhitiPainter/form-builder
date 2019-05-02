export class EnumHelper {
    static getNamesAndValues<T extends number>(e: any) {
        return EnumHelper.getNames(e).map(n => ({ name: n, value: e[n] as T }));
    }

    static getNames(e: any) {
        return Object.keys(e).filter(k => typeof e[k] === 'number') as string[];
    }

    static GetDescription(e: any, id: string): string {
        return e[id + 'Description'];
    }

    static GetEnumDescription(e: any, eVal: any) {
        if (eVal && eVal !== undefined) {
            return EnumHelper.GetDescription(e, e[+eVal]);
        }

        return '';
    }

    static getEnumWithDescriptions(e: any) {
        const enumItems: any = [];

        const keys = Object.keys(e).filter(item => {
            return isNaN(Number(item));
        });
        keys.forEach(key => {
            const value = e[key];
            if (typeof value === 'number') {
                const enumDescription = this.GetDescription(e, key);
                enumItems.push({ name: enumDescription, value: value });
            }
        });
        return enumItems;
    }

    static getEnumName(e: any, value: string) {
        return e[value];
    }

    static getDescriptionByKey(e: any, key: string) {
        const value = e[key];
        return this.GetDescription(e, value);
    }
}
