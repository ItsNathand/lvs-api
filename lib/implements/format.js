class format {

    constructor() {

        if(typeof this.parse !== 'function') {
            throw new Error("must implement function export");
        }
    }
}

export { format };
//render(json)