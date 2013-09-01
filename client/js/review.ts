/// <reference path="../external/knockout-2.3.0.d.ts" />
/// <reference path="../external/jquery-1.10.2.d.ts" />

class ReviewModel {
    public available: KnockoutObservableArray<PanicContracts.HelpRequest>;
    //public getHelpRequests: (callback: (newHelpRequests:PanicContracts.HelpRequest[])=> void) => void;
    //public approveRequestAjax: (HelpRequest: PanicContracts.HelpRequest, callback:()=>void) => void;
    public approveRequest: (HelpRequest: PanicContracts.HelpRequest) => void;

    constructor() {
        var self = this;
        this.available = ko.observableArray();

        // Populate the help requests.
        function getRequest() {
            setTimeout(() => {
                // Use self inside of timeout; this becomes window.
                self.getRequestAjax((newRequests : PanicContracts.HelpRequest[]) => {
                    // Straight-up replace them all. 
                    self.available.removeAll();
                    $.map(newRequests, (elem, index) => {
                        self.available.unshift(elem);
                    });
                });
                getRequest();
            }, 2000);
        }
        getRequest();

        this.approveRequest = (HelpRequest: PanicContracts.HelpRequest) => {
            this.approveRequestAjax(HelpRequest, () => {
                console.log("Approved!");
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
            },

            error: function (xhr, ajaxOptions, thrownError) {
                console.log("Disconnected...");
            },
        });
    }

    public approveRequestAjax(HelpRequest: PanicContracts.HelpRequest, callback: () => void) {
        // Grab the request id.
        $.ajax({
            type: "PATCH",
            data: { status: "approved" },
            dataType: "text",
            url: "http://" + window.location.host + "/requests/" + HelpRequest.urlId,
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


//function arrayUpdate(a:PanicContracts.HelpRequest[], )

ko.applyBindings(new ReviewModel());
