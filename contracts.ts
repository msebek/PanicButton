/// <reference path="external/node-0.10.1.d.ts" />

module PanicContracts {

    export interface requestSchema {
        timestamp: Number;
        urlId: String;      // short form of URL
        requestingTeamName: String;
        location: String;
        topic: String;
        description: String;
        blockingProblem: String;
        status: String
    }

    export class RequestStatuses {
        static pendingApproval: String = "pendingApproval";
        static approved: String = "approved";
        static assigned: String = "assigned";
        static closed: String = "closed";
    }

}