(function ($, d, t) {
    var WebLibraries,
        Message,
        DownloadButton,
        DoneButton,
        MainLoadingFrame,
        WebLibrariesApplication = angular.module('WebLibrariesApplication', []),
        Selected = [],
        Links = [],
        Project = 'Project';
    WebLibrariesApplication.controller('WebLibrariesController', function ($scope, $http) {
        $http.get('web_libraries.json').success(function (response) {
            $scope.Libraries = response;
            var i = 0,
                l = $scope.Libraries.length;
            for (; i < l; i++) {
                Selected.push(false);
                Links.push($scope.Libraries[i].link);
            }
        });
    }).directive('entryRepeatDirective', function () {
        return function ($scope, $element) {
            $element = $($element, WebLibraries);
            t.fromTo($element, 1, {
                opacity: 0,
                y: -35
            }, {
                opacity: 1,
                y: 0,
                ease: Power4.easeOut
            });
            var Index = $scope.$index;
            if (Selected[Index]) $element.removeClass('Off').addClass('On');
            $element.on('click', function () {
                $element.ToggleEntry(Index);
            }).on('keydown', function (e) {
                var First = $scope.$first,
                    Last = $scope.$last;
                if (e.which === 13) {
                    e.preventDefault();
                    $element.ToggleEntry(Index);
                } else if (e.which === 32) {
                    e.preventDefault();
                    $element.ToggleEntry(Index);
                } else if (e.which === 38) {
                    e.preventDefault();
                    $element.trigger('blur');
                    if (First) {
                        $('.Entry', WebLibraries).last().trigger('focus');
                    } else {
                        $('#Entry-' + (Index - 1), WebLibraries).trigger('focus');
                    }
                }
                else if (e.which === 40) {
                    e.preventDefault();
                    $element.trigger('blur');
                    if (Last) {
                        $('#Entry-0', WebLibraries).trigger('focus');
                    } else {
                        $('#Entry-' + (Index + 1), WebLibraries).trigger('focus');
                    }
                }
            });
        };
    });
    $.fn.ToggleEntry = function (Index) {
        var Element = this,
            EntryState = Element.hasClass('On'),
            RemoveClass = EntryState ? 'On' : 'Off',
            AddClass = EntryState ? 'Off' : 'On';
        Selected[Index] = !EntryState;
        if (!EntryState) {
            Element.removeClass(RemoveClass).addClass(AddClass);
            t.fromTo(Element.find('.Checker'), 0.25, {
                opacity: 0,
                scale: 0,
                transformOrigin: '50% 50%'
            }, {
                opacity: 1,
                scale: 1,
                transformOrigin: '50% 50%',
                ease: Power4.easeOut
            });
        }
        else {
            t.to(Element.find('.Checker'), 0.25, {
                opacity: 0,
                scale: 0,
                transformOrigin: '50% 50%',
                ease: Power4.easeOut,
                onComplete: function () {
                    Element.removeClass(RemoveClass).addClass(AddClass);
                }
            });
        }
    };
    $(d).on('ready', function () {
	alert("main");
        MainLoadingFrame = $('#MainLoadingFrame', d);
        WebLibraries = $('#WebLibraries', d);
        Message = $('#Message', WebLibraries);
        DoneButton = $('#DoneButton', WebLibraries).on('click', function () {
            window.open('http://localhost:3000', '_self');
        });
        DownloadButton = $('#DownloadButton', WebLibraries).on('click', function () {
		alert("main2");
            var Array = [],
                i = 0,
                l = Selected.length;
            for (; i < l; i++) if (Selected[i]) Array.push(Links[i]);
			alert(Array.length);
            if (Array.length > 0) {
			alert("inside if");
                MainLoadingFrame.Loading(function () {
				alert("sending");
                    var LoadingObject = this;
                    $.ajax({
                        type: 'POST',
                        url: 'http://127.0.0.1:80/Main_2/download.php',
                        data: {
                            links: Array,
                            project: Project
                        },
                        cache: false,
                        success: function (data) {
                            Message.fadeOut(100, function () {
                                if (data !== 'error') {
									alert(data);
                                    Message.html('Downloading...').fadeIn(200, function () {
                                        setTimeout(function () {
                                            Message.fadeOut(400, function () {
                                                Message.html('');
                                            });
                                        }, 2000);
                                        window.open('http://127.0.0.1:80/Main_2/'+data, '_self');
                                    });
                                } else {
                                    Message.html('Something went wrong, please try again.').fadeIn(200);
                                }
                            });
                            LoadingObject.Stop();
                        }
                    });
					alert("sent");
                });
				alert("endif");
            } else {
				alert("not listening");
                Message.html('Please select at least one library!').fadeIn(100, function () {
                    setTimeout(function () {
                        Message.fadeOut(400, function () {
                            Message.html('');
                        });
                    }, 1000);
                });
            }
        });
    });
})(jQuery, document, TweenMax);
