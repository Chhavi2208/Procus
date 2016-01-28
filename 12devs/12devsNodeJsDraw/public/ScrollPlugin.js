/*
 Author : Divya Mamgai (2015)
 Requirement : jQuery, jQuery Mousewheel Plugin and TweenMax
 */
(function ($) {
    $.fn.ScrollPlugin = function (mF, o, wO) {
        var SectionArray = [],
            SectionPositionArray = [],
            NumberOfSections = this.length,
            RawArray = this,
            MainFrame = $('#' + mF).css({
                position: 'absolute',
                top: 0,
                left: 0
            }),
            Options = $.extend({
                FunctionsIn: [],
                FunctionsOut: [],
                MouseScroll: true,
                SideMenu: true,
                SideMenuResponseArea: 20,
                SideMenuClass: 'ScrollPluginMenu',
                SideMenuButtonClass: 'ScrollPluginMenuButton',
                SideMenuButtonIcons: [],
                Easing: Power4.easeOut,
                Duration: 1,
                ResizeSection: true
            }, o),
            FunctionsIn = Options.FunctionsIn,
            FunctionsOut = Options.FunctionsOut,
            MouseScroll = Options.MouseScroll,
            SideMenu = Options.SideMenu,
            SideMenuResponseArea = Options.SideMenuResponseArea,
            SideMenuClass = Options.SideMenuClass,
            SideMenuButtonClass = Options.SideMenuButtonClass,
            SideMenuButtonIcons = Options.SideMenuButtonIcons,
            SideMenuButtonIconSize,
            SideMenuButtonIconSizeHalf,
            SideMenuButtons = [],
            SideMenuButtonImages = [],
            SideMenuObject,
            SideMenuWrapper,
            SideMenuOpened = false,
            MenuHalfHeight,
            Easing = Options.Easing,
            Duration = Options.Duration,
            HalfDuration = Duration / 2,
            ResizeSection = Options.ResizeSection,
            WindowObject = wO || $(window),
            Window = WindowObject[0],
            WindowWidth = Window.innerWidth,
            WindowHeight = Window.innerHeight,
            WindowHalfHeight = WindowHeight / 2,
            Scrolling = false,
            EnableScroll = false,
            Current = 1,
            PreviousIndex = 0,
            i = 0;
        for (; i < NumberOfSections; i++) {
            SectionArray.push($(RawArray[i]));
            SectionPositionArray.push(SectionArray[i].position().top);
            SectionArray[i].css({
                position: 'relative',
                display: 'block',
                padding: 0,
                margin: 0
            });
            FunctionsIn[i] = FunctionsIn[i] || '';
            FunctionsOut[i] = FunctionsOut[i] || '';
            SideMenuButtonIcons[i] = SideMenuButtonIcons[i] || '';
        }
        SideMenuButtonIconSize = parseInt(SectionArray[0].width() * 0.05 - 20);
        SideMenuButtonIconSizeHalf = SideMenuButtonIconSize / 2;
        var Functions = {
            PerformScroll: function (ScrollTo) {
                ScrollTo = ScrollTo || false;
                var Index = Current - 1,
                    FunctionIn = FunctionsIn[Index];
                Functions.HighlightCurrentSideMenuIcon();
                TweenMax.to(MainFrame, Duration, {
                    y: -SectionPositionArray[Index],
                    ease: Easing,
                    onComplete: function () {
                        Scrolling = false;
                    }
                });
                TweenMax.to(SectionArray[Index], HalfDuration, {
                    scale: 0.9,
                    transformOrigin: '50% 50%',
                    marginLeft: SideMenuOpened ? SideMenuButtonIconSizeHalf : 0,
                    ease: Easing,
                    onComplete: SideMenuOpened ? FunctionIn ? function () {
                        Scrolling = false;
                        Window[FunctionIn]();
                    } : function () {
                        Scrolling = false;
                    } : function () {
                        TweenMax.to(SectionArray[Index], HalfDuration, {
                            scale: 1,
                            transformOrigin: '50% 50%',
                            marginLeft: 0,
                            ease: Easing,
                            onComplete: FunctionIn ? function () {
                                Scrolling = false;
                                Window[FunctionIn]();
                            } : function () {
                                Scrolling = false;
                            }
                        });
                    }
                });
                if (ScrollTo && SideMenuOpened) {
                    if (PreviousIndex != Index && PreviousIndex !== -1) {
                        var FunctionOut = FunctionsOut[PreviousIndex];
                        if (FunctionOut) Window[FunctionOut]();
                    }
                    PreviousIndex = Index;
                } else {
                    if (PreviousIndex != Index) {
                        TweenMax.to(SectionArray[PreviousIndex], HalfDuration, {
                            scale: 0.9,
                            transformOrigin: '50% 50%',
                            ease: Easing,
                            onComplete: function () {
                                TweenMax.to(SectionArray[PreviousIndex], HalfDuration, {
                                    scale: 1,
                                    transformOrigin: '50% 50%',
                                    ease: Easing,
                                    onComplete: function () {
                                        if (PreviousIndex !== -1) {
                                            var FunctionOut = FunctionsOut[PreviousIndex];
                                            if (FunctionOut) Window[FunctionOut]();
                                        }
                                        PreviousIndex = Index;
                                    }
                                });
                            }
                        });
                    }
                }
            },
            ScrollDown: function () {
                if (!EnableScroll) return;
                if (!Scrolling) {
                    Scrolling = true;
                    Current++;
                    if (Current <= NumberOfSections) {
                        Functions.PerformScroll();
                    } else {
                        Current = NumberOfSections;
                        Scrolling = false;
                    }
                }
            },
            ScrollUp: function () {
                if (!EnableScroll) return;
                if (!Scrolling) {
                    Scrolling = true;
                    Current--;
                    if (Current >= 1) {
                        Functions.PerformScroll();
                    } else {
                        Current = 1;
                        Scrolling = false;
                    }
                }
            },
            ScrollTo: function (Count) {
                if (!EnableScroll) return;
                if (Count >= 1 && Count <= NumberOfSections) {
                    Current = Count;
                    Functions.PerformScroll(true);
                }
            },
            ReSize: function (onlyMenu) {
                onlyMenu = onlyMenu || false;
                WindowWidth = Window.innerWidth;
                WindowHeight = Window.innerHeight;
                WindowHalfHeight = WindowHeight / 2;
                if (SideMenuObject !== undefined) {
                    SideMenuObject.css({
                        top: WindowHalfHeight - MenuHalfHeight
                    });
                }
                if (!onlyMenu) {
                    var j = 0,
                        Section;
                    for (; j < NumberOfSections; j++) {
                        Section = SectionArray[j];
                        if (ResizeSection) {
                            Section.css({
                                width: WindowWidth,
                                height: WindowHeight
                            });
                        }
                        SectionPositionArray[j] = Section.position().top;
                    }
                }
            },
            CreateSideMenu: function () {
                SideMenuObject = $('<div class="' + SideMenuClass + '"></div>').appendTo(SideMenuWrapper).css({
                    position: 'fixed',
                    display: 'block',
                    left: -SideMenuButtonIconSize - 10,
                    zIndex: 99
                });
                var j = 0;
                for (; j < NumberOfSections; j++) {
                    SideMenuButtons[j] = $('<div></div>').attr({
                        class: SideMenuButtonClass,
                        section: j + 1
                    }).appendTo(SideMenuObject)
                        .css({
                            width: 'auto',
                            height: 'auto',
                            padding: 5,
                            cursor: 'pointer'
                        }).on('mouseover', function () {
                            var This = $(this);
                            TweenMax.to(This, HalfDuration, {
                                opacity: 1,
                                ease: Easing
                            });
                            TweenMax.to(This.find('img'), HalfDuration, {
                                marginLeft: 10,
                                ease: Easing
                            });
                        }).on('click', function () {
                            Functions.ScrollTo(parseInt($(this).attr('section')));
                        }).on('mouseout', function () {
                            var This = $(this);
                            TweenMax.to(This, HalfDuration, {
                                opacity: 0.5,
                                ease: Easing
                            });
                            TweenMax.to(This.find('img'), HalfDuration, {
                                marginLeft: 0,
                                ease: Easing
                            });
                        });
                    SideMenuButtonImages[j] = $('<img/>').attr({
                        id: 'SideMenuButtons-' + j,
                        width: SideMenuButtonIconSize,
                        height: SideMenuButtonIconSize,
                        src: SideMenuButtonIcons[j]
                    }).appendTo(SideMenuButtons[j]);
                }
                MenuHalfHeight = SideMenuObject.height() / 2;
                Functions.HighlightCurrentSideMenuIcon().ReSize(true);
                return Functions;
            },
            HighlightCurrentSideMenuIcon: function () {
                if (SideMenu) {
                    var Index = Current - 1;
                    TweenMax.to(SideMenuButtonImages[Index], HalfDuration, {
                        scale: 1.2,
                        transformOrigin: '50% 50%',
                        ease: Power4.easeOut
                    });
                    if (PreviousIndex != Index) {
                        TweenMax.to(SideMenuButtonImages[PreviousIndex], HalfDuration, {
                            scale: 1,
                            transformOrigin: '50% 50%',
                            ease: Power4.easeOut
                        });
                    }
                }
                return Functions;
            },
            OpenSideMenu: function () {
                if (!SideMenuOpened) {
                    SideMenuOpened = true;
                    var j = 0;
                    TweenMax.to(SideMenuWrapper, HalfDuration, {
                        width: SideMenuButtonIconSize + SideMenuButtonIconSizeHalf + 10,
                        ease: Easing
                    });
                    TweenMax.killDelayedCallsTo(SideMenuObject);
                    TweenMax.to(SideMenuObject, HalfDuration, {
                        left: 0,
                        ease: Easing
                    });
                    for (; j < NumberOfSections; j++) {
                        TweenMax.to(SectionArray[j], HalfDuration, {
                            scale: 0.9,
                            transformOrigin: '50% 50%',
                            marginLeft: SideMenuButtonIconSizeHalf,
                            ease: Easing
                        });
                        TweenMax.fromTo(SideMenuButtons[j], HalfDuration, {
                            marginLeft: -10
                        }, {
                            marginLeft: 0,
                            opacity: 0.5,
                            ease: Easing,
                            delay: j * 0.15
                        });
                        if (j == Current - 1) {
                            var FunctionIn = FunctionsIn[j];
                            if (FunctionIn) Window[FunctionIn]();
                        }
                    }
                }
                return Functions;
            },
            CloseSideMenu: function () {
                if (SideMenuOpened) {
                    SideMenuOpened = false;
                    TweenMax.to(SideMenuWrapper, HalfDuration, {
                        width: SideMenuResponseArea,
                        ease: Easing
                    });
                    TweenMax.to(SideMenuObject, HalfDuration, {
                        left: -SideMenuButtonIconSize - 10,
                        ease: Easing,
                        delay: NumberOfSections * 0.2
                    });
                    var j = 0;
                    for (; j < NumberOfSections; j++) {
                        TweenMax.to(SectionArray[j], HalfDuration, {
                            scale: 1,
                            transformOrigin: '50% 50%',
                            marginLeft: 0,
                            ease: Easing
                        });
                        TweenMax.to(SideMenuButtons[j], HalfDuration, {
                            marginLeft: -10,
                            opacity: 0,
                            ease: Easing,
                            delay: j * 0.15
                        });
                    }
                }
                return Functions;
            },
            EnableScroll: function () {
                EnableScroll = true;
                return Functions;
            },
            DisableScroll: function () {
                EnableScroll = false;
                return Functions;
            }
        };
        if (SideMenu) {
            SideMenuWrapper = $('<div class="SideMenuWrapper"></div>').appendTo(MainFrame.parent()).css({
                position: 'fixed',
                top: 0,
                left: 0,
                height: WindowHeight,
                width: SideMenuResponseArea
            });
            Functions.CreateSideMenu();
            SideMenuWrapper.on('mouseenter', function () {
                Functions.OpenSideMenu();
            });
            SideMenuWrapper.on('mouseleave', function () {
                Functions.CloseSideMenu();
            });
        }
        $('body').css('overflow', 'hidden');
        if (MouseScroll) {
            WindowObject.on('mousewheel', function (e, delta) {
                e.preventDefault();
                if (!SideMenuOpened) {
                    if (delta < 0) Functions.ScrollDown();
                    else if (delta > 0) Functions.ScrollUp();
                }
            });
        }
        WindowObject.on('keydown', function (e) {
            if (!SideMenuOpened) {
                if (e.keyCode === 38) {
                    e.preventDefault();
                    Functions.ScrollUp();
                } else if (e.keyCode === 40) {
                    e.preventDefault();
                    Functions.ScrollDown();
                }
            }
        });
        WindowObject.on('resize', function () {
            Functions.ReSize();
        });
        return Functions;
    };
})(jQuery);
