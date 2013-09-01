/// <reference path="../external/knockout-2.3.0.d.ts" />
/// <reference path="../external/jquery-1.10.2.d.ts" />

class ReviewModel {
    public available: KnockoutObservableArray<PanicContracts.HelpRequest>;
    public refresh: () => void;
    public getHelpRequests: () => void;
    public approveRequest: (HelpRequest: PanicContracts.HelpRequest) => void;


    constructor() {
        var self = this;
        this.available = ko.observableArray([]);

        this.getHelpRequests = () => {
            console.log("Retreiving all help requests called!");

            // JQuery Node: If you have 201 status code, make sure { dataType: "text" }
            $.ajax({
                type: "GET",
                dataType: "json",
                url: "http://" + window.location.host + "/requests",
                success: function (data: PanicContracts.HelpRequest[], textStatus: String, jqXHR: any) {
                    console.log("Success");
                    // Find difference between arrays
                    var difference = [];
                    difference = self.arrayDifference(data, self.available.slice(0));

                    // Sort by time

                    // Add to front of Available.
                    $.map(difference, (elementOfArray, indexInArray) => {
                        self.available.unshift(<PanicContracts.HelpRequest>elementOfArray);
                    });

                },

                error: function (xhr, ajaxOptions, thrownError) {
                    alert("Something is dumb");
                },
            });
        }

        // Populate the help requests.
        function retry() {
            setTimeout(() => {
                console.log("starting retry...");
                self.getHelpRequests();
                retry();
            }, 3000);
        }

        retry();

        this.approveRequest = (HelpRequest: PanicContracts.HelpRequest) => {
            // Grab the request id.
            $.ajax({
                type: "PATCH",
                data: { status: "approved" },
                dataType: "text",
                url: "http://" + window.location.host + "/requests" + HelpRequest.urlId
            });
        }

    }

    // Find the difference between two arrays of objects. perform a - b
    public arrayDifference(a:PanicContracts.HelpRequest[], b:PanicContracts.HelpRequest[]) {
        // Make hashtable of ids in B
        var bIds : any = {};
        $.each(b, (function(index, req : PanicContracts.HelpRequest){
                bIds[req.urlId] = req;
        }));

        // Return all elements in A, unless in B
        return $.grep(a, (function (req : PanicContracts.HelpRequest, index) {
            return !(<any>req.urlId in bIds);
        }));
    }

}




ko.applyBindings(new ReviewModel());
