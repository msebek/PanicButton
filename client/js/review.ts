/// <reference path="../external/knockout-2.3.0.d.ts" />
/// <reference path="../external/knockout-2.3.0.mapping.d.ts" />
/// <reference path="../external/jquery-1.10.2.d.ts" />

class ReviewModel {
    public available: any;
    public approveRequest: (HelpRequest: PanicContracts.HelpRequest) => void;

    constructor() {
        var self = this;
        // Start trying to take advantage of Knockout mappings
        var requests: PanicContracts.HelpRequest[];
        // Initially retrieve data
        $.ajax({
            async: false,
            url: "http://" + window.location.host + "/requests",
            dataType: "json",
            success: function (result) {
                requests = result;
            }
        });

        // Load the viewmodel
        this.available = ko.mapping.fromJS(requests);
        console.log(requests);

        // Populate the help requests.
        function getRequest() {
            setTimeout(() => {
                // Use self inside of timeout; this becomes window.
                self.getRequestAjax((newRequests : PanicContracts.HelpRequest[]) => {
                    // TODO: intelligently diff them, and update them.  
                    ko.mapping.fromJS(newRequests, self.available);
                });
                getRequest();
            }, 2000);
        }
        getRequest();

        this.approveRequest = (HelpRequest: PanicContracts.HelpRequest) => {
            this.approveRequestAjax(HelpRequest, () => {
                // Do stuff once approved is sent...
            });
        }  
      
    }

    public getRequestAjax(callback: (allRequests: PanicContracts.HelpRequest[]) => void) {
        // JQuery Node: If you have 201 status code, make sure { dataType: "text" }
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "http://" + window.location.host + "/requests",
            success: function (data: PanicContracts.HelpRequest[], textStatus: String, jqXHR: any) {
                callback(data);
                console.log(data);
            },

            error: function (xhr, ajaxOptions, thrownError) {
                console.log("Disconnected...");
            }
        });
    }

    public approveRequestAjax(HelpRequest: PanicContracts.HelpRequest, callback: () => void) {
        // Grab the request id.
        $.ajax({
            type: "PATCH",
            data: { status: "approved" },
            dataType: "text",
            url: "http://" + window.location.host + "/requests/" + HelpRequest.urlId(),
            success: callback
        });
    }

}

class ReviewViewModel extends ReviewModel {
    public showRequest: (elem) => void;

    constructor() {
        super();
        this.showRequest = (elem) => {
            if (elem.nodeType === 1) $(elem).slideUp(function () { $(elem).remove(); })
        }
    }
}

// Find the difference between two arrays of objects. perform a - b
function arrayDifference(a:PanicContracts.HelpRequest[], b:PanicContracts.HelpRequest[]) {
    // Make hashtable of ids in B
    var bIds: any = {};
    $.each(b, (function (index, req: PanicContracts.HelpRequest) {
        bIds[req.urlId] = req;
    }));

    // Return all elements in A, unless in B
    return $.grep(a, (function (req: PanicContracts.HelpRequest, index) {
        return !(<any>req.urlId in bIds);
    }));
}

ko.applyBindings(new ReviewViewModel());
