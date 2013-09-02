/// <reference path="../external/knockout-2.3.0.d.ts" />

module PanicContracts {

    export interface HelpRequest {
        timestamp?: KnockoutObservable<Number>;
        urlId?: KnockoutObservable<String>;      // short form of URL
        requestingTeamName: KnockoutObservable<String>;
        location: KnockoutObservable<String>;
        topic: KnockoutObservable<String>;
        description?: KnockoutObservable<String>;
        blockingProblem?: KnockoutObservable<String>;
        status?: KnockoutObservable<String>;
    }

    export class SupportedTechnologies {
        public javascript: String = "JavaScript";
        public html: String = "HTML";
        public css: String = "CSS";
    }

}