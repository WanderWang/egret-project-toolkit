import * as _fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import parse, { Dependencies, Defines } from './parse';

interface FactoryOptions {
  dirs: string[];
  fs?: typeof _fs;
}

export default class Factory {
  private dirs: string[];

  private fs: typeof _fs;

  public files: {
    [name: string]: {
      mtime: number;
      isModule: boolean;
      dependencies: Dependencies;
      defines: Defines;
    };
  };

  public identifiers: {
    [name: string]: Set<string>;
  };

  constructor({ dirs, fs }: FactoryOptions) {
    this.dirs = dirs;
    this.fs = fs || _fs;
    this.files = {}; // 文件分析缓存
    this.identifiers = {}; // 全部全局变量分布
  }

  public get(fileName: string) {
    return this.files[fileName] || null;
  }

  public update() {
    const files: any = {};

    this.dirs.forEach(dir => {
      glob.sync('**/*.ts', {
        cwd: dir,
      })
        .filter(item => !item.endsWith('.d.ts')) // ignore .d.ts
        .forEach(item => {
          files[path.join(dir, item)] = true;
        });
    });

    Object.keys(files).forEach(item => {
      this.add(item);
    });

    Object.keys(this.files).forEach(item => {
      if (!files[item]) {
        // remove file
        this.remove(item);
      }
    });
  }

  private remove(fileName: string) {
    if (this.files[fileName]) {
      const oldDefines = this.files[fileName].defines;

      // remove identifier
      Object.keys(oldDefines).forEach(name => {
        if (this.identifiers[name]) {
          this.identifiers[name].delete(fileName);

          if (!this.identifiers[name].size) {
            delete this.identifiers[name];
          }
        }
      });

      delete this.files[fileName];
    }
  }

  private add(fileName: string) {
    const mtime = +this.fs.statSync(fileName).mtime;

    const { files } = this;

    if (files[fileName] && files[fileName].mtime === mtime) {
      return;
    }

    this.remove(fileName);

    const content = this.fs.readFileSync(fileName).toString();

    const { defines, dependencies, isModule } = parse(fileName, content);

    // update identifiers
    Object.keys(defines).forEach(name => {
      if (!this.identifiers[name]) {
        this.identifiers[name] = new Set();
      }
      this.identifiers[name].add(fileName);
    });

    files[fileName] = {
      mtime,
      isModule,
      dependencies,
      defines,
    };
  }

  private findDependencyFiles(dependencies: Dependencies): string[] {
    const files: Set<string> = new Set();
    Object.keys(dependencies).forEach(key => {
      let thisFiles: Set<string> | null = null;
      const tmp = key.split('@');
      const names = tmp[0].split('.');
      const namspaces = tmp[1] ? tmp[1].split('.') : [];
      for (let i = namspaces.length; i >= 0; i--) { // 插入一个空的空间
        const ns = namspaces.slice(0, i).join('.');
        for (let j = names.length; j > 0; j--) {
          const name = names.slice(0, j).join('.');
          const fullName = (ns ? ns + '.' : '') + name;
          if (this.identifiers[fullName]) {
            thisFiles = this.identifiers[fullName];
            break;
          }
        }
        if (thisFiles) {
          break;
        }
      }
      if (thisFiles) {
        thisFiles.forEach(item => {
          files.add(item)
        })
      }
    });
    return Array.from(files);
  }

  // 排序非模块化文件
  public sortUnmodules() {
    let list = Object.keys(this.files)
      .filter(file => !this.files[file].isModule)
      .sort();

    // 冒泡排序
    list.forEach(fileName => {
      let dependencyFiles = this.findDependencyFiles(this.files[fileName].dependencies);

      const index = list.findIndex(item => item === fileName);

      // 筛选在自己后面的文件
      dependencyFiles = dependencyFiles.filter(dep => {
        return list.findIndex(item => item === dep) > index;
      });

      if (dependencyFiles.length) {
        list = list.filter(item => !dependencyFiles.includes(item));
        list.splice(index, 0, ...dependencyFiles);
      }
    });

    return list;
  }
}
