import Sites from './Sites';

export default class Row {
    id: number;
    sites: Sites[] = [];
    constructor(startingIndex: number) {
        this.id = startingIndex;
        // console.log(startingIndex);
        let i = (6 * startingIndex);
        let end = (i+6)
        for ( ; i < end; i++) {
                console.log(i);
                const site = new Sites(i);
                this.sites.push(site);
            }
     }
}
