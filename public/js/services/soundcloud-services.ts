///<reference path="../../../typings/tsd.d.ts" />

module app.services {
    'use strict';

    export interface ISoundcloudServices {
        getSoundcloudSongs(): ng.IPromise<any>
    }

    class SoundcloudServices implements ISoundcloudServices {

        constructor(private $http: ng.IHttpService, private $q: ng.IQService){}

        getSoundcloudSongs(): ng.IPromise<any> {
            var q = this.$q.defer();

            this.$http.get('/api/soundcloud')
                .success((data) => {
                    q.resolve(data);
                })
                .error((error) => {
                    q.reject(error);
                });

            return q.promise;
        }

    }

    angular.module('services')
        .factory('SoundcloudServices', ['$http', '$q', ($http, $q) => new SoundcloudServices($http, $q)]);
}