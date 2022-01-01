import fs from 'fs-extra';
import { ReadStream, WriteStream } from 'fs';
import path from 'path';
import { without } from 'underscore';

import fetch from 'node-fetch';
import util from 'util';
import stream from 'stream';

const streamPipeline = util.promisify(stream.pipeline);

class Fs {
    /**
     *
     * @param err
     */
    private isErrorNotFound(err: any): boolean {
        return err.code === 'ENOENT';
    }

    /**
     * Async awaited version of the check if a path resolves to a dir
     *
     * @param {string} path
     * @returns {Promise<boolean>}
     */
    public async isFolder(path: string): Promise<boolean> {
        const stats = await fs.stat(path).catch((err): boolean => {
            if (this.isErrorNotFound(err))
                return false;

            throw err;
        });

        // @ts-ignore
        return !stats ? stats : stats.isDirectory();
    }

    /**
     *
     * @param path
     * @returns {Promise<boolean>}
     */
    public async isFile(path: string): Promise<boolean> {
        const stats = await fs.stat(path).catch((err): boolean => {
            if (this.isErrorNotFound(err))
                return false;

            throw err;
        });

        // @ts-ignore
        return !stats ? stats : await stats.isFile();
    }

    /**
     * Read a file
     *
     * @param {string} path
     * @returns {Promise<string>}
     */
    public async readFile(path: string): Promise<string> {
        return await fs.readFile(path, 'utf8');
    }

    /**
     *
     * @param dir
     */
    public async readDir(dir: string): Promise<string[]> {
        return await fs.readdir(dir);
    }

    /**
     *
     * @param path
     * @param data
     * @returns {Promise<void>}
     */
    public async writeFile(path: string, data: string): Promise<void> {
        await fs.writeFile(path, data, {encoding: 'utf8', flag: 'w'});
    }

    /**
     *
     * @param path
     * @returns {Promise<*>}
     */
    public createReadStream(path: string): ReadStream {
        return fs.createReadStream(path);
    }

    /**
     *
     * @param path
     */
    public createWriteStream(path: string): WriteStream {
        return fs.createWriteStream(path);
    }

    /**
     *
     * @param path
     * @returns {Promise<void>}
     */
    public async remove(path: string): Promise<void> {
        await fs.remove(path);
    }

    /**
     *
     * @param path
     * @returns {Promise<void>}
     */
    public async emptyDir(path: string): Promise<void> {
        await fs.emptyDir(path);
    }

    /**
     *
     * @param path
     * @param mode
     */
    public async chmod(path: string, mode: string | number): Promise<void> {
        await fs.chmod(path, mode);
    }

    /**
     *
     * @param path
     * @param destPath
     * @returns {Promise<void>}
     */
    public async copy(path: string, destPath: string): Promise<void> {
        await fs.copy(path, destPath);
    }

    public async getRecursivelyFiles(dir: string, filter = ""): Promise<string[]> {
        const files: string[] = await this.readDir(dir);

        const listOfFiles: string[] = await Promise.all(files
            // Prepend the directory this file belongs to
            .map((f): string => path.join(dir, f))
            // Iterate the files and see if we need to recurse by type
            .map(async (f): Promise<any> => {
                // See what type of file this is

                if (f.toLowerCase().endsWith("allure-reporter.log"))
                    return "";

                const stats = await fs.stat(f);
                // Recurse if it is a directory, otherwise return the filepath
                if (stats.isDirectory())
                    return await this.getRecursivelyFiles(f, filter);
                else if (filter !== "" && f.toLowerCase().endsWith(filter))
                    return f;
                else if (filter === "")
                    return f;
                else
                    return "";

            })
        );

        return without(listOfFiles, "");
    }

    public async download(url, filePath) {
        const response = await fetch(url);

        if (!response.ok)
            throw new Error(`unexpected response ${response.statusText}`);

        return await streamPipeline(response.body, fs.createWriteStream(filePath));
    }
}

export default new Fs();
