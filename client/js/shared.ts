/// <reference path="../external/knockout-2.3.0.d.ts" />

module PanicContracts {

    export interface HelpRequest {
        requestingTeamName: String;
        location: String;
        topic: String;
    }

    export class SupportedTechnologies {
        public javascript: String = "JavaScript";
        public html: String = "HTML";
        public css: String = "CSS";
    }

}