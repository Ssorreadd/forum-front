import {reactive} from "vue";

class QueryBuilder {
    private query: { [key: string]: string[] } = {  };

    public addKey(key: string, value: string | number | null) {
        if (value === null || value === -1)
            return;

        if (!this.query[key]) this.query[key] = [];
        if (this.query[key].includes(value.toString())) return;
        this.query[key].push(value.toString());
    }

    public deleteKey(key: string, value: string | number) {
        this.query[key] = this.query[key].filter(item => item != value);
    }

    public setKey(key: string, value: string | number) {
        if (!this.query[key]) this.query[key] = [];
        this.query[key][0] = value.toString();
    }

    public deleteAllValue(key: string) {
        this.query[key] = [];
    }

    public clear () {
        this.query = {};
    }

    public getQuery() {
        let str: string = '';
        for (const key of Object.keys(this.query)) {
            for (const value of this.query[key]) {
                str += `${key}=${value.replaceAll(' ', '+')}&`;
            }
        }
        return str.slice(0, -1);
    }

}

export default reactive(new QueryBuilder());
