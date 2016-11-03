angular.module("umbraco")
    .controller("%SolutionName%.GridMediaWithLinkController", function ($scope, assetsService, dialogService, entityResource) {
        assetsService.loadCss("/App_Plugins/GridMediaWithLink/editor.min.css");
        // Fetch internal node names if any nodes are selected.
        console.log($scope.control);

        if ($scope.control.value && $scope.control.value.length) {
            angular.forEach($scope.control.value,
                function(item, key) {
                    if (item.internalContentId) {
                        entityResource.getById(item.internalContentId, "Document")
                            .then(function(ent) {
                                item.internalContentName = ent.name;
                            });
                    }
                });
        } else {
            $scope.control.value = [{}];
        }

        $scope.openContentPicker = function (item, contentId) {
            dialogService.contentPicker({
                multipicker: false,
                callback: function (data) {
                    item.internalContentId = data.id;
                    item.internalContentName = data.name;
                }
            });
        };

        $scope.addItem = function () {
            if (!$scope.control.value)
                $scope.control.value = [];
            $scope.control.value.push({});
        }

        $scope.removeItem = function (index) {
            $scope.control.value.splice(index, 1);
        }

        $scope.clearLink = function (item) {
            item.internalContentId = null;
            item.internalContentName = null;
        }

        $scope.openMediaPicker = function (item) {
            dialogService.mediaPicker({
                callback: function (data) {
                    item.ImageId = data.id;
                    item.ImageThumb = data.thumbnail;
                }
            });
        }

        $scope.removePicture = function (item) {
            item.ImageId = null;
            item.ImageThumb = undefined;
        }

        if ($scope.control.ImageId > 0) {
            entityResource.getById($scope.person.ImageId, "Media").then(function (item) {
                $scope.node = item;
            });
        }

        $scope.openMenuMediaPicker = function (item) {
            dialogService.mediaPicker({
                callback: function (data) {
                    item.MenuImageId = data.id;
                    item.MenuImageThumb = data.thumbnail;
                }
            });
        }

        $scope.removeMenuPicture = function (item) {
            item.MenuImageId = null;
            item.MenuImageThumb = undefined;
        }

        //Internal/external url
        $scope.internalUrl = function (item) {
            item.UrlMode = "internal";
        }

        $scope.externalUrl = function (item) {
            item.UrlMode = "external";
        }
        
    });
