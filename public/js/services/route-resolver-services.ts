///<reference path="../../../typings/tsd.d.ts" />
///<reference path="youtube-services.ts"/>

module app.services {
    'use strict';

    export interface IRouteResolverService {
        resolveVideosDetails(videoId: string): ng.IPromise<any>;
    }

    class RouteResolverServices implements IRouteResolverService {

        constructor(private $q: ng.IQService, private YoutubeServices: IYoutubeServices){ }

        resolveVideosDetails(videoId: string):ng.IPromise<any> {
            return this.$q.all([
                this.YoutubeServices.getYouTubeVideoById(videoId)
            ]).then((results: any[]): any => {
                return {
                    video: results[0].data
                }
            });
        }
    }

    angular.module('services')
        .factory('RouteResolverServices',
            ['$q', 'YoutubeServices', ($q, YoutubeServices) => new RouteResolverServices($q, YoutubeServices)]);
}