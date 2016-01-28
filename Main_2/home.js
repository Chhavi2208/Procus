(function ($, w, d, wO, dO, t) {
    var HomeSVG,
        HomeSVGRoot,
        HomeLogo,
        HomeTagLine,
        HomeRightWire,
        HomeRightThread,
        HomeRightOption,
        HomeClosedDoor,
        HomeClosedDoorKnob,
        HomeCreateRoom,
        HomeRightOptionBack,
        HomeRightHead,
        HomeLeftWire,
        HomeLeftThread,
        HomeLeftOption,
        HomeOpenedDoor,
        HomeOpenedDoorUpper,
        HomeJoinRoom,
        HomeLeftOptionBack,
        HomeLeftHead,
        HomeRegisterOrLogin,
        HomeColorIndex = 0,
        HomeColors = [
            'rgb(100,100,255)',
            'rgb(100,255,100)',
            'rgb(255,100,100)',
            'rgb(255,255,100)',
            'rgb(100,255,255)',
            'rgb(255,100,255)',
            'rgb(170,170,170)'
        ],
        Form,
        FormHalfHeight,
        RegisterForm,
        LoginForm,
        TextInput,
        EmailInput,
        Button,
        LoginSubmit,
        RegisterSubmit,
        GoBackHome,
        JoinForm,
        JoinFormHalfHeight,
        RoomID,
        RoomPassword,
        JoinSubmit,
        MainLoadingFrame,
        ScrollObject,
        WindowWidth = w.innerWidth,
        WindowHeight = w.innerHeight,
        HalfWindowWidth = WindowWidth / 2,
        HalfWindowHeight = WindowHeight / 2,
        Functions = {
            Validate: function (Element, Value) {
                if (!(/^([a-zA-Z0-9_\.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(Value)) && (Value.length > 0)) {
                    t.to(Element, 1, {
                        backgroundColor: 'rgb(160, 48, 48)',
                        ease: Power4.easeOut
                    });
                } else {
                    t.to(Element, 1, {
                        backgroundColor: 'rgb(60, 128, 80)',
                        ease: Power4.easeOut
                    });
                }
            },
            BindEmailIDValidator: function () {
                EmailInput = $('.EmailID').on('keyup', function () {
                    Functions.Validate(this, this.value);
                }).on('keydown', function () {
                    Functions.Validate(this, this.value);
                });
            },
            TextInputFocus: function () {
                var Label = $(this).parent().find('label');
                t.to(Label, 0.5, {
                    scale: 0.7,
                    opacity: 0,
                    ease: Power4.easeOut
                });
                t.fromTo(this, 0.25, {
                    borderColor: 'rgb(60, 128, 80)'
                }, {
                    borderColor: 'rgb(38,38,38)',
                    ease: Power4.easeOut
                });
            },
            TextInputBlur: function () {
                if (this.value.length === 0) {
                    var Label = $(this).parent().find('label');
                    t.to(Label, 0.5, {
                        scale: 1,
                        opacity: 1,
                        ease: Power4.easeOut
                    });
                }
                t.fromTo(this, 0.5, {
                    borderColor: 'rgb(38,38,38)'
                }, {
                    borderColor: 'rgb(60, 128, 80)',
                    ease: Power4.easeOut
                });
            },
            ButtonFocus: function () {
                t.fromTo(this, 0.25, {
                    borderColor: 'rgb(38,38,38)'
                }, {
                    borderColor: 'rgb(19,19,19)',
                    ease: Power4.easeOut
                });
            },
            ButtonBlur: function () {
                t.fromTo(this, 0.5, {
                    borderColor: 'rgb(19,19,19)'
                }, {
                    borderColor: 'rgb(38,38,38)',
                    ease: Power4.easeOut
                });
            },
            ButtonOver: function () {
                t.fromTo(this, 0.5, {
                    borderColor: 'rgb(38,38,38)',
                    backgroundColor: 'rgb(38,38,38)'
                }, {
                    borderColor: 'rgb(28,28,28)',
                    backgroundColor: 'rgb(28,28,28)',
                    ease: Power4.easeOut
                });
            },
            ButtonOut: function () {
                t.fromTo(this, 0.5, {
                    borderColor: 'rgb(28,28,28)',
                    backgroundColor: 'rgb(28,28,28)'
                }, {
                    borderColor: 'rgb(38,38,38)',
                    backgroundColor: 'rgb(38,38,38)',
                    ease: Power4.easeOut
                });
            },
            ButtonDown: function () {
                t.to(this, 0.5, {
                    backgroundColor: 'rgb(19,19,19)',
                    ease: Power4.easeOut
                });
            },
            ButtonUp: function () {
                t.to(this, 0.5, {
                    backgroundColor: 'rgb(38,38,38)',
                    ease: Power4.easeOut
                });
            },
            LinkOver: function () {
                t.to(this, 0.5, {
                    color: '#ffffff',
                    ease: Power4.easeOut
                });
            },
            LinkOut: function () {
                t.to(this, 0.5, {
                    color: '#aaaaaa',
                    ease: Power4.easeOut
                });
            },
            LoginSubmit: function () {
                MainLoadingFrame.Loading(function () {
                    setTimeout(this.Stop, 5000);
                });
            },
            RegisterSubmit: function () {
                MainLoadingFrame.Loading(function () {
                    setTimeout(this.Stop, 5000);
                });
            },
            JoinRoom: function () {
                var RoomIDValue = RoomID.val(),
                    RoomPasswordValue = RoomPassword.val();
                MainLoadingFrame.Loading(function () {
                    var LoadingObject = this;
                    setTimeout(function () {
                        LoadingObject.Stop();
                    }, 5000);
                });
            },
            PositionForm: function () {
                Form.css({
                    top: HalfWindowHeight - FormHalfHeight
                });
                JoinForm.css({
                    top: HalfWindowHeight - JoinFormHalfHeight,
                    left: HalfWindowWidth - 210
                });
            },
            HomeLogoAnimation: function () {
                t.to(HomeLogo, 2, {
                    fill: HomeColors[HomeColorIndex],
                    ease: Power4.easeOut,
                    delay: 1,
                    onComplete: Functions.HomeLogoAnimation
                });
                t.to(HomeTagLine, 2, {
                    fill: HomeColors[HomeColorIndex],
                    delay: 1,
                    ease: Power4.easeOut
                });
                HomeColorIndex = (HomeColorIndex + 1) % 7;
            },
            StartHomeAnimation: function () {
                t.fromTo(HomeRightWire, 1, {
                    opacity: 0,
                    x: -200
                }, {
                    opacity: 1,
                    x: 246,
                    ease: Power4.easeOut,
                    onComplete: function () {
                        t.to(HomeRightWire, 0.5, {
                            fill: 'rgb(20, 50, 100)',
                            filter: 'none',
                            ease: Power4.easeOut,
                            onComplete: function () {
                                t.fromTo(HomeLogo, 2, {
                                    opacity: 0,
                                    scale: 0,
                                    transformOrigin: '50% 50%'
                                }, {
                                    opacity: 1,
                                    scale: 1,
                                    transformOrigin: '50% 50%',
                                    ease: Power4.easeOut,
                                    onComplete: function () {
                                        t.fromTo(HomeRegisterOrLogin, 0.5, {
                                            y: 50,
                                            opacity: 0,
                                            scale: 0.7,
                                            transformOrigin: '50% 50%'
                                        }, {
                                            y: -5,
                                            opacity: 1,
                                            ease: Power4.easeOut,
                                            onComplete: function () {
                                                HomeRegisterOrLogin.on('mouseenter', function () {
                                                    t.to(HomeRegisterOrLogin, 0.5, {
                                                        fill: '#ffffff',
                                                        ease: Power4.easeOut
                                                    });
                                                }).on('mouseleave', function () {
                                                    t.to(HomeRegisterOrLogin, 0.5, {
                                                        fill: '#aaaaaa',
                                                        ease: Power4.easeOut
                                                    });
                                                }).on('click', function () {
                                                    ScrollObject.ScrollDown();
                                                });
                                            }
                                        });
                                        t.fromTo(HomeRightOptionBack, 1, {
                                            y: 0,
                                            opacity: 0,
                                            attr: {
                                                height: 12
                                            }
                                        }, {
                                            y: -144,
                                            opacity: 1,
                                            attr: {
                                                height: 300
                                            },
                                            ease: Elastic.easeOut.config(5, 5),
                                            onComplete: function () {
                                                t.set(HomeRightThread, {
                                                    width: 480
                                                });
                                                t.to(HomeClosedDoor, 1, {
                                                    opacity: 1,
                                                    ease: Power4.easeOut
                                                });
                                                t.to(HomeCreateRoom, 1, {
                                                    opacity: 1,
                                                    scale: 0.7,
                                                    transformOrigin: '50% 50%',
                                                    ease: Power4.easeOut
                                                });
                                                HomeRightOption.on('mouseenter', function () {
                                                    t.to(HomeRightWire, 1, {
                                                        fill: 'rgb(40, 100, 200)',
                                                        ease: Power4.easeOut
                                                    });
                                                    t.to(HomeRightOption, 1, {
                                                        scale: 1.2,
                                                        transformOrigin: '50% 50%',
                                                        ease: Elastic.easeOut.config(5, 5)
                                                    });
                                                    t.to(HomeRightThread, 1, {
                                                        width: 500,
                                                        ease: Elastic.easeOut.config(5, 5)
                                                    });
                                                    t.to(HomeClosedDoorKnob, 0.5, {
                                                        rotationZ: 20,
                                                        scale: 1.2,
                                                        transformOrigin: '50% 50%',
                                                        ease: Power4.easeOut,
                                                        onComplete: function () {
                                                            t.to(HomeClosedDoorKnob, 0.25, {
                                                                rotationZ: -20,
                                                                transformOrigin: '50% 50%',
                                                                ease: Power4.easeOut,
                                                                onComplete: function () {
                                                                    t.to(HomeClosedDoorKnob, 0.25, {
                                                                        rotationZ: 20,
                                                                        transformOrigin: '50% 50%',
                                                                        ease: Power4.easeOut,
                                                                        onComplete: function () {
                                                                            t.to(HomeClosedDoorKnob, 0.5, {
                                                                                rotationZ: 0,
                                                                                scale: 1,
                                                                                transformOrigin: '50% 50%',
                                                                                ease: Elastic.easeOut.config(5, 5)
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }).on('mouseleave', function () {
                                                    t.to(HomeRightWire, 1, {
                                                        fill: 'rgb(20, 50, 100)',
                                                        ease: Power4.easeOut
                                                    });
                                                    t.to(HomeRightOption, 1, {
                                                        scale: 1,
                                                        transformOrigin: '50% 50%',
                                                        ease: Elastic.easeOut.config(5, 5)
                                                    });
                                                    t.to(HomeRightThread, 1, {
                                                        width: 480,
                                                        ease: Elastic.easeOut.config(5, 5)
                                                    });
                                                }).on('click', function () {
                                                    ScrollObject.ScrollTo(3);
                                                });
                                            }
                                        });
                                        t.fromTo(HomeLeftOptionBack, 1, {
                                            y: 0,
                                            opacity: 0,
                                            attr: {
                                                height: 12
                                            }
                                        }, {
                                            y: -144,
                                            opacity: 1,
                                            attr: {
                                                height: 300
                                            },
                                            ease: Elastic.easeOut.config(5, 5),
                                            onComplete: function () {
                                                t.to(HomeOpenedDoor, 1, {
                                                    opacity: 1,
                                                    ease: Power4.easeOut
                                                });
                                                t.to(HomeJoinRoom, 1, {
                                                    opacity: 1,
                                                    scale: 0.7,
                                                    transformOrigin: '50% 50%',
                                                    ease: Power4.easeOut
                                                });
                                                HomeLeftOption.on('mouseenter', function () {
                                                    t.to(HomeLeftWire, 1, {
                                                        fill: 'rgb(40, 100, 200)',
                                                        ease: Power4.easeOut
                                                    });
                                                    t.to(HomeLeftOption, 1, {
                                                        scale: 1.2,
                                                        transformOrigin: '50% 50%',
                                                        ease: Elastic.easeOut.config(5, 5)
                                                    });
                                                    t.to(HomeLeftThread, 1, {
                                                        width: 500,
                                                        x: -20,
                                                        ease: Elastic.easeOut.config(5, 5)
                                                    });
                                                    t.to(HomeOpenedDoorUpper, 2, {
                                                        rotationY: 60,
                                                        skewY: 10,
                                                        ease: Elastic.easeOut.config(5, 5)
                                                    });
                                                }).on('mouseleave', function () {
                                                    t.to(HomeLeftWire, 1, {
                                                        fill: 'rgb(20, 50, 100)',
                                                        ease: Power4.easeOut
                                                    });
                                                    t.to(HomeLeftOption, 1, {
                                                        scale: 1,
                                                        transformOrigin: '50% 50%',
                                                        ease: Elastic.easeOut.config(5, 5)
                                                    });
                                                    t.to(HomeLeftThread, 1, {
                                                        width: 480,
                                                        x: 0,
                                                        ease: Elastic.easeOut.config(5, 5)
                                                    });
                                                    t.to(HomeOpenedDoorUpper, 2, {
                                                        rotationY: 0,
                                                        skewY: 0,
                                                        ease: Elastic.easeOut.config(5, 5)
                                                    });
                                                }).on('click', function () {
                                                    ScrollObject.ScrollTo(3);
                                                });
                                            }
                                        });
                                        Functions.HomeLogoAnimation();
                                    }
                                });
                                t.fromTo(HomeTagLine, 2, {
                                    opacity: 0,
                                    scale: 0,
                                    transformOrigin: '50% 50%',
                                    y: 0,
                                    x: 2
                                }, {
                                    opacity: 1,
                                    scale: 0.5,
                                    transformOrigin: '50% 50%',
                                    y: 40,
                                    delay: 0.1,
                                    ease: Power4.easeOut
                                });
                                t.fromTo(HomeRightWire, 2, {
                                    x: 246
                                }, {
                                    x: 146,
                                    filter: 'url(#Shadow)',
                                    ease: Power4.easeOut
                                });
                                t.fromTo(HomeRightHead, 2, {
                                    opacity: 1,
                                    x: 246
                                }, {
                                    opacity: 0,
                                    x: 146,
                                    filter: 'url(#Shadow)',
                                    scale: 2,
                                    transformOrigin: '0% 50%',
                                    ease: Power4.easeOut
                                });
                                t.fromTo(HomeLeftWire, 2, {
                                    x: -246
                                }, {
                                    x: -146,
                                    filter: 'url(#Shadow)',
                                    ease: Power4.easeOut
                                });
                                t.fromTo(HomeLeftHead, 2, {
                                    opacity: 1,
                                    x: -246
                                }, {
                                    opacity: 0,
                                    x: -146,
                                    filter: 'url(#Shadow)',
                                    scale: 2,
                                    transformOrigin: '100% 50%',
                                    ease: Power4.easeOut
                                });
                            }
                        });
                        t.to(HomeRightHead, 0.5, {
                            fill: 'rgb(20, 50, 100)',
                            filter: 'none',
                            ease: Power4.easeOut
                        });
                        t.to(HomeLeftWire, 0.5, {
                            fill: 'rgb(20, 50, 100)',
                            filter: 'none',
                            ease: Power4.easeOut
                        });
                        t.to(HomeLeftHead, 0.5, {
                            fill: 'rgb(20, 50, 100)',
                            filter: 'none',
                            ease: Power4.easeOut
                        });
                    }
                });
                t.fromTo(HomeRightHead, 1, {
                    opacity: 0,
                    x: -200
                }, {
                    opacity: 1,
                    x: 246,
                    ease: Power4.easeOut
                });
                t.fromTo(HomeLeftWire, 1, {
                    opacity: 0,
                    x: 200
                }, {
                    opacity: 1,
                    x: -246,
                    ease: Power4.easeOut
                });
                t.fromTo(HomeLeftHead, 1, {
                    opacity: 0,
                    x: 200
                }, {
                    opacity: 1,
                    x: -246,
                    ease: Power4.easeOut
                });
            }
        };
    dO.on('ready', function () {
        MainLoadingFrame = $('#MainLoadingFrame', d);
        HomeSVG = $('#HomeSVG', d).on('load', function () {
            HomeSVGRoot = $(this.contentDocument.documentElement);
            HomeLogo = $('#Logo', HomeSVGRoot);
            HomeTagLine = $('#TagLine', HomeSVGRoot);
            HomeRightWire = $('#RightWire', HomeSVGRoot);
            HomeRightThread = $('#RightThread', HomeSVGRoot);
            HomeRightOption = $('#RightOption', HomeSVGRoot);
            HomeClosedDoor = $('#ClosedDoor', HomeSVGRoot);
            t.set(HomeClosedDoor, {scale: 0.8, transformOrigin: '50% 50%'});
            HomeClosedDoorKnob = $('#ClosedDoorKnob', HomeSVGRoot);
            HomeCreateRoom = $('#CreateRoom', HomeSVGRoot);
            HomeRightOptionBack = $('#RightOptionBack', HomeSVGRoot);
            HomeRightHead = $('#RightHead', HomeSVGRoot);
            HomeLeftWire = $('#LeftWire', HomeSVGRoot);
            HomeLeftThread = $('#LeftThread', HomeSVGRoot);
            HomeLeftOption = $('#LeftOption', HomeSVGRoot);
            HomeOpenedDoor = $('#OpenedDoor', HomeSVGRoot);
            t.set(HomeOpenedDoor, {scale: 0.8, transformOrigin: '50% 50%'});
            HomeOpenedDoorUpper = $('#OpenedDoorUpper', HomeSVGRoot);
            HomeJoinRoom = $('#JoinRoom', HomeSVGRoot);
            HomeLeftOptionBack = $('#LeftOptionBack', HomeSVGRoot);
            HomeLeftHead = $('#LeftHead', HomeSVGRoot);
            HomeRegisterOrLogin = $('#RegisterOrLogin', HomeSVGRoot);
            Functions.StartHomeAnimation();
        });
        Form = $('#Form', d);
        JoinForm = $('#JoinForm', d);
        FormHalfHeight = Form.height() / 2;
        JoinFormHalfHeight = JoinForm.height() / 2;
        RoomID = $('#RoomID', JoinForm);
        RoomPassword = $('#RoomPassword', JoinForm);
        JoinSubmit = $('#JoinSubmit', JoinForm).on('click', Functions.JoinRoom);
        Functions.PositionForm();
        RegisterForm = $('.Register', d).on('mouseenter', function () {
            t.to(RegisterForm, 0.5, {
                opacity: 1,
                ease: Power4.easeOut
            });
        }).on('mouseleave', function () {
            t.to(RegisterForm, 0.5, {
                opacity: 0.7,
                ease: Power4.easeOut
            });
        });
        LoginForm = $('.Login', d).on('mouseenter', function () {
            t.to(LoginForm, 0.5, {
                opacity: 1,
                ease: Power4.easeOut
            });
        }).on('mouseleave', function () {
            t.to(LoginForm, 0.5, {
                opacity: 0.7,
                ease: Power4.easeOut
            });
        });
        TextInput = $('.Text', d).on('focus', Functions.TextInputFocus)
            .on('blur', Functions.TextInputBlur)
            .on('mouseenter', Functions.TextInputOver)
            .on('mouseleave', Functions.TextInputOut);
        Functions.BindEmailIDValidator();
        Button = $('.Button', d).on('focus', Functions.ButtonFocus)
            .on('blur', Functions.ButtonBlur)
            .on('mousedown', Functions.ButtonDown)
            .on('mouseup', Functions.ButtonUp)
            .on('mouseover', Functions.ButtonOver)
            .on('mouseout', Functions.ButtonOut);
        LoginSubmit = $('#LoginSubmit', d).on('click', Functions.LoginSubmit);
        RegisterSubmit = $('#RegisterSubmit', d).on('click', Functions.RegisterSubmit);
        ScrollObject = $('section', d).css({
            width: WindowWidth,
            height: WindowHeight
        }).ScrollPlugin('MainFrame', {
            SideMenu: false
        }, wO).EnableScroll();
        GoBackHome = $('#GoBackHome', d).on('click', ScrollObject.ScrollUp).on('mouseover', Functions.LinkOver).on('mouseout', Functions.LinkOut);
    });
    wO.on('resize', function () {
        WindowWidth = w.innerWidth;
        WindowHeight = w.innerHeight;
        HalfWindowWidth = WindowWidth / 2;
        HalfWindowHeight = WindowHeight / 2;
        Functions.PositionForm();
    });
})(jQuery, window, document, jQuery(window), jQuery(document), TweenMax);
