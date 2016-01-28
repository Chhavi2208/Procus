(function ($, w, d, wO, dO, t) {

    $.fn.Loading = function (CallBack) {
	alert('main.js');
        var Element = this,
            LoaderSize = 128,
            HalfLoaderSize = 64,
            Loader,
            SVGRoot,
            Outer,
            Inner,
            IsReady = false,
            IsStopped = false,
            Stop = false,
            InnerScaleUp = false,
            ColorIndex = 0,
            NumberOfColors = 7,
            OuterColors = [
                'rgb(47,85,151)',
                'rgb(84,130,53)',
                'rgb(51,63,80)',
                'rgb(46,117,182)',
                'rgb(197,90,17)',
                'rgb(191,141,0)',
                'rgb(59,56,56)'
            ],
            InnerColors = [
                'rgb(143,170,220)',
                'rgb(169,209,142)',
                'rgb(132,151,176)',
                'rgb(157,195,230)',
                'rgb(244,177,131)',
                'rgb(255,217,102)',
                'rgb(118,113,113)'
            ], _Functions = {
                Position: function () {
                    if (IsReady) {
                        var Width = Element.width(),
                            Height = Element.height(),
                            HalfWidth = Width / 2,
                            HalfHeight = Height / 2;
                        if (Width < LoaderSize && Height > LoaderSize) {
                            LoaderSize = Width;
                            HalfLoaderSize = LoaderSize / 2;
                        } else if (Width > LoaderSize && Height < LoaderSize) {
                            LoaderSize = Height;
                            HalfLoaderSize = LoaderSize / 2;
                        } else if (Width < LoaderSize && Height < LoaderSize) {
                            if (Width < Height) {
                                LoaderSize = Width;
                                HalfLoaderSize = LoaderSize / 2;
                            } else {
                                LoaderSize = Height;
                                HalfLoaderSize = LoaderSize / 2;
                            }
                        }
                        Loader.attr({
                            width: LoaderSize,
                            height: LoaderSize
                        }).css({
                            top: HalfHeight - HalfLoaderSize,
                            left: HalfWidth - HalfLoaderSize
                        });
                        return _Functions;
                    }
                },
                Animate: function () {
                    t.to(Outer, 1, {
                        rotation: '+=90',
                        transformOrigin: '50% 50%',
                        fill: OuterColors[ColorIndex],
                        ease: Power4.easeOut,
                        onComplete: Stop ? _Functions.StopAnimation : _Functions.Animate
                    });
                    t.to(Inner, 1, {
                        rotation: '-=90',
                        scale: InnerScaleUp ? 1 : 0.7,
                        transformOrigin: '50% 50%',
                        fill: InnerColors[ColorIndex],
                        ease: Elastic.easeOut.config(5, 5)
                    });
                    ColorIndex = (ColorIndex + 1) % NumberOfColors;
                    InnerScaleUp = !InnerScaleUp;
                },
                Start: function () {
                    if (IsReady) {
                        Stop = false;
                        IsStopped = false;
                        Element.addClass('Loading');
                        t.fromTo(Loader, 0.5, {
                            scale: 0.5,
                            transformOrigin: '50% 50%',
                            opacity: 0
                        }, {
                            scale: 1,
                            transformOrigin: '50% 50%',
                            opacity: 1,
                            ease: Power4.easeOut
                        });
                        t.to(Element, 0.5, {
                            opacity: 1,
                            ease: Power4.easeOut,
                            onComplete: function () {
                                _Functions.Animate();
                                if (CallBack !== undefined) CallBack.call(_Functions);
                            }
                        });
                        return _Functions;
                    }
                },
                Stop: function () {
                    if (IsReady) {
                        Stop = true;
                        return _Functions;
                    }
                },
                StopAnimation: function () {
                    t.to(Loader, 0.5, {
                        scale: 0.5,
                        transformOrigin: '50% 50%',
                        opacity: 0,
                        ease: Power4.easeOut
                    });
                    t.to(Element, 0.5, {
                        opacity: 0,
                        ease: Power4.easeOut,
                        onComplete: function () {
                            Element.css('display', 'none');
                            IsStopped = true;
                        }
                    });
                },
                /**
                 * @return {boolean}
                 */
                Remove: function () {
                    if (IsReady) {
                        if (!IsStopped) _Functions.Stop();
                        Loader.remove();
                        return true;
                    } else return false;
                }
            };
        Element.css({
            display: 'block',
            opacity: 0
        });
        if (!Element.hasClass('Loading')) {
            Loader = $('<object type="image/svg+xml" data="/images/loading.svg" id="Loader" width="' + LoaderSize + 'px" height="' + LoaderSize + 'px"></object>').appendTo(Element)
                .css({
                    position: 'absolute',
                    top: 0,
                    left: 0
                })
                .on('load', function () {
                    SVGRoot = $(this.contentDocument.documentElement);
                    Outer = $('#Outer', SVGRoot);
                    Inner = $('#Inner', SVGRoot);
                    IsReady = true;
                    _Functions.Position().Start();
                });
            wO.on('resize', function () {
                _Functions.Position();
            });
        } else {
            Loader = Element.find('#Loader');
            SVGRoot = $(Loader[0].contentDocument.documentElement);
            Outer = $('#Outer', SVGRoot);
            Inner = $('#Inner', SVGRoot);
            IsReady = true;
            _Functions.Position().Start();
        }
        return _Functions;
    };
})(jQuery, window, document, jQuery(window), jQuery(document), TweenMax);
