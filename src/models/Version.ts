export class Version {

    nameVersion : String;
    versionInDevelopment : String;
    dependencies : String[];
    added : String[];
    changes : String[];
    deprecated : String[];
    fixes : String[];
    securities : String[];

    constructor (nameVersion : String, versionInDevelopment : String, dependencies : String[], added : String[], changes : String[], deprecated : String[], fixes : String[], securities : String[]) {
        this.nameVersion = nameVersion;
        this.versionInDevelopment = versionInDevelopment;
        this.dependencies = dependencies;
        this.added = added;
        this.changes = changes;
        this.deprecated = deprecated;
        this.fixes = fixes;
        this.securities = securities;
    }


}
