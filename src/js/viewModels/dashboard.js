/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojbutton', 'ojs/ojcollectiontabledatasource'],
 function(oj, ko, $) {

    function DashboardViewModel() {
      var self = this;

      self.restBackEndUrl = "http://138.68.79.219:7001/restapp/rest/1/Jobs?onlyData=true";

      self.createModel = function () {
          var ModelData = oj.Model.extend({
              urlRoot: self.restBackEndUrl,
              idAttribute: 'JobId'
          });
          return new ModelData();
      };

      self.createCollection = function () {
          var CollectionData = oj.Collection.extend({
              url: self.restBackEndUrl,
              fetchSize: -1,
              model: this.createModel()
          });
          return new CollectionData();
      };

      self.jobsData = self.createCollection();

      self.testMethodCall = function(event) {
        callBackendInSynch();
      }

      async function callBackendInSynch() {
          //This loop will wait for each next() to pass the next iteration
          for (var i = 0; i < 3; i++) {
              await new Promise(next=> {
                self.jobsData.fetch({
                    success: function (collection, response) {
                      console.log('A: REST Call Success Complete');

                      next();
                    }
                });
              })

              // self.jobsData.fetch({
              //     success: function (collection, response) {
              //       console.log('A: REST Call Success Complete');
              //     }
              // });

              console.log('B: Loop Step Complete');
          }
      }

      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      self.connected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new DashboardViewModel();
  }
);
