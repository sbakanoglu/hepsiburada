class Variables {
    /**
     *  Replace all strings
     *
     * @param string
     * @param searchValue
     * @param replaceValue
     */
    public replaceAll(string: string, searchValue: string, replaceValue: string): string {
        return string.split(searchValue).join(replaceValue);
    }

    /**
     * mergeArrays an arbitrarrily deep Array of Arrays to a single Array
     * @param {Array} arr Array of Arrays to flatten
     * @returns {Array} The flattened Array
     */
    public mergeArrays(arr: any): string[] {
        return arr.reduce((flat: { concat: (arg0: any) => void }, toFlatten: any): any => flat.concat(Array.isArray(toFlatten) ? this.mergeArrays(toFlatten) : toFlatten), []);
    }

    /**
     *
     * @param arr
     */
    public orderedArray(arr: any): any {
        const ordered: any = {};

        Object.keys(arr).sort().forEach(function (key): void {
            ordered[key] = arr[key];
        });

        return ordered;
    }
}

export default new Variables();
