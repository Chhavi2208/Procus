(function ($, w, d, wO, dO, t) {
    var MainFrame,
        RoomSection,
        ExitButton,
        ChatFrame,
        ChatFrameOpened = false,
        ChatHead,
        ChatHeadArrow,
        ChatMessages,
        ChatText,
        ChatTextSubmit,
        EntryTableWrapper,
        ScrollObject,
        WindowWidth = w.innerWidth,
        WindowHeight = w.innerHeight,
        HalfWindowWidth = WindowWidth / 2,
        HalfWindowHeight = WindowHeight / 2,
        Functions = {
            ChatHeadMouseEnter: function () {
                t.to(ChatHead, 1, {
                    color: '#ffffff',
                    ease: Power4.easeOut
                });
                t.to(ChatHeadArrow, 1, {
                    scale: 1.5,
                    transformOrigin: '50% 50%',
                    ease: Power4.easeOut
                });
            },
            ChatHeadMouseLeave: function () {
                t.to(ChatHead, 1, {
                    color: '#cccccc',
                    ease: Power4.easeOut
                });
                t.to(ChatHeadArrow, 1, {
                    scale: 1,
                    transformOrigin: '50% 50%',
                    ease: Power4.easeOut
                });
            },
            ChatHeadClick: function () {
                if (ChatFrameOpened) {
                    t.to(ChatHeadArrow, 1, {
                        rotation: 180,
                        scale: 1,
                        transformOrigin: '50% 50%',
                        ease: Power4.easeOut
                    });
                    t.to(ChatMessages, 1, {
                        height: 0,
                        opacity: 0,
                        ease: Power4.easeOut,
                        onComplete: function () {
                            ChatFrameOpened = false;
                        }
                    });
                    t.to(ChatText, 1, {
                        bottom: -50,
                        opacity: 0,
                        ease: Power4.easeOut
                    });
                } else {
                    t.to(ChatHeadArrow, 1, {
                        rotation: 0,
                        scale: 1,
                        transformOrigin: '50% 50%',
                        ease: Power4.easeOut
                    });
                    t.to(ChatMessages, 1, {
                        height: 400,
                        opacity: 1,
                        ease: Power4.easeOut,
                        onComplete: function () {
                            ChatFrameOpened = true;
                        }
                    });
                    t.to(ChatText, 1, {
                        bottom: 0,
                        opacity: 1,
                        ease: Power4.easeOut
                    });
                }
            },
            ChatTextSubmitMouseEnter: function () {
                t.to(ChatTextSubmit, 1, {
                    scale: 1.2,
                    transformOrigin: '50% 50%',
                    ease: Power4.easeOut
                });
            },
            ChatTextSubmitMouseLeave: function () {
                t.to(ChatTextSubmit, 1, {
                    scale: 1,
                    transformOrigin: '50% 50%',
                    ease: Power4.easeOut
                });
            },
            ChatTextSubmitMouseDown: function () {
                t.to(ChatTextSubmit, 0.25, {
                    scale: 0.9,
                    transformOrigin: '50% 50%',
                    ease: Power4.easeOut
                });
            },
            ChatTextSubmitMouseUp: function () {
                t.to(ChatTextSubmit, 0.25, {
                    scale: 1.2,
                    transformOrigin: '50% 50%',
                    ease: Power4.easeOut
                });
            },
            ExitButtonMouseEnter: function () {
                t.to(ExitButton, 1, {
                    color: '#ffffff',
                    ease: Power4.easeOut
                });
            },
            ExitButtonMouseLeave: function () {
                t.to(ExitButton, 1, {
                    color: '#aaaaaa',
                    ease: Power4.easeOut
                });
            },
            ExitButtonClick: function () {
                ScrollObject.EnableScroll().ScrollDown();
                ScrollObject.DisableScroll();
            }
        };
    dO.on('ready', function () {
        MainFrame = $('#MainFrame', d);
        RoomSection = $('#RoomSection', MainFrame);
        ExitButton = $('#ExitButton', RoomSection)
            .on('mouseenter', Functions.ExitButtonMouseEnter)
            .on('mouseleave', Functions.ExitButtonMouseLeave)
            .on('click', Functions.ExitButtonClick);
        ChatFrame = $('#ChatFrame', RoomSection);
        ChatHead = $('#ChatHead', ChatFrame)
            .on('mouseenter', Functions.ChatHeadMouseEnter)
            .on('mouseleave', Functions.ChatHeadMouseLeave)
            .on('click', Functions.ChatHeadClick);
        ChatHeadArrow = $('#ChatHeadArrow', ChatHead);
        t.set(ChatHeadArrow, {
            rotation: 180
        });
        ChatMessages = $('#ChatMessages', ChatFrame);
        ChatText = $('#ChatText', ChatFrame);
        ChatTextSubmit = $('#ChatTextSubmit', ChatText)
            .on('mouseenter', Functions.ChatTextSubmitMouseEnter)
            .on('mouseleave', Functions.ChatTextSubmitMouseLeave)
            .on('mousedown', Functions.ChatTextSubmitMouseDown)
            .on('mouseup', Functions.ChatTextSubmitMouseUp);
        EntryTableWrapper = $('#EntryTableWrapper', d).css('max-height', WindowHeight - 111);
        ScrollObject = $('section', d).css({
            width: WindowWidth,
            height: WindowHeight
        }).ScrollPlugin('MainFrame', {
            SideMenu: false,
            MouseScroll: false
        }, wO);
    });
    wO.on('resize', function () {
        WindowWidth = w.innerWidth;
        WindowHeight = w.innerHeight;
        HalfWindowWidth = WindowWidth / 2;
        HalfWindowHeight = WindowHeight / 2;
        EntryTableWrapper.css('max-height', WindowHeight - 111);
    });
})(jQuery, window, document, jQuery(window), jQuery(document), TweenMax);
