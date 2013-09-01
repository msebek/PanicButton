/// <reference path="../external/knockout-2.3.0.d.ts" />

module PanicContracts {

    export interface HelpRequest {
        timestamp?: Number;
        urlId?: String;      // short form of URL
        requestingTeamName: String;
        location: String;
        topic: String;
        description?: String;
        blockingProblem?: String;
        status?: String
    }

    export class SupportedTechnologies {
        public javascript: String = "JavaScript";
        public html: String = "HTML";
        public css: String = "CSS";
    }

}