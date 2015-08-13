(function($){
    $(document).ready(function() {

        /*----------------------------------------------------*/
        /*	Sticky Header
         /*----------------------------------------------------*/
        (function () {
            $('.navbar').scrollToFixed(); // Fixed Navigation Bar

            // Moving Logo from Logo-Bar to Navbar-header on Tab size of 768px or Minimum
            $(window).on("load resize orientationchange", function (e) {
                if ($(window).width() < 768) {
                    $("#logo").detach().appendTo($(".navbar-header"));
                }
                else {
                    $("#logo").detach().appendTo('#logo-bar .container .col-xs-12')
                }
            });

        })();

        /*----------------------------------------------------*/

        if ($.fn.cssOriginal != undefined) {
            $.fn.css = $.fn.cssOriginal;
        }

        /*----------------------------------------------------*/
        /*	Carousel
         /*----------------------------------------------------*/
        // Add classes for other carousels
        var $carousel = $('.recent-work-jc');
        var scrollCount;

        function adjustScrollCount() {
            if ($(window).width() < 768) {
                scrollCount = 1;
            } else {
                scrollCount = 3;
            }
        }

        function adjustCarouselHeight() {
            $carousel.each(function () {
                var $this = $(this);
                var maxHeight = -1;
                $this.find('li').each(function () {
                    maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
                });
                $this.height(maxHeight);
            });
        }

        function initCarousel() {
            adjustCarouselHeight();
            adjustScrollCount();
            var i = 0;
            var g = {};
            $carousel.each(function () {
                i++;
                var $this = $(this);
                g[i] = $this.jcarousel({
                    animation: 600,
                    scroll: scrollCount
                });
                $this.jcarousel('scroll', 0);
                $this.prev().find('.jcarousel-prev').bind('active.jcarouselcontrol', function () {
                    $(this).addClass('active');
                }).bind('inactive.jcarouselcontrol', function () {
                    $(this).removeClass('active');
                }).jcarouselControl({
                    target: '-=' + scrollCount,
                    carousel: g[i]
                });

                $this.prev().find('.jcarousel-next').bind('active.jcarouselcontrol', function () {
                    $(this).addClass('active');
                }).bind('inactive.jcarouselcontrol', function () {
                    $(this).removeClass('active');
                }).jcarouselControl({
                    target: '+=' + scrollCount,
                    carousel: g[i]
                });

                $this.touchwipe({
                    wipeLeft: function () {
                        $this.jcarousel('scroll', '+=' + scrollCount);
                    },
                    wipeRight: function () {
                        $this.jcarousel('scroll', '-=' + scrollCount);
                    }
                });
            });
        }

        $(window).load(function () {
            initCarousel();
        });

        $(window).resize(function () {
            $carousel.each(function () {
                var $this = $(this);
                $this.jcarousel('destroy');
            });
            initCarousel();
        });


        $("body").tooltip({
            selector: '[data-toggle="tooltip"]'
        });


        //  ============================
        //  = Scroll event function =
        //  ===========================
        var goScrolling = function (elem) {
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();
            var elemTop = elem.offset().top;
            var elemBottom = elemTop + elem.height();
            return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        };


        //  =======================
        //  = Progress bars =
        //  =======================
        $('.progress_skill .bar').data('width', $(this).width()).css({
            width: 0,
            height: 0
        });
        $(window).scroll(function () {
            $('.progress_skill .bar').each(function () {
                if (goScrolling($(this))) {
                    $(this).css({
                        width: $(this).attr('data-value') + '%',
                        height: $(this).attr('data-height') + '%'
                    });
                }
            });
        });


        //  ===================
        //  = Flickr Gallery =
        //  ===================
        $('#flickrFeed').jflickrfeed({
            limit: 9,
            qstrings: {
                //id: '124787947@N07' our id //
                id: '124787947@N07'
            },
            itemTemplate: '<li><a class="mfp-gallery" title="{{title}}" href="{{image_b}}"><i class="fa fa-search"></i><div class="hover"></div></a><img src="{{image_s}}" alt="{{title}}" /></li>'
        });


        /*===========================================================*/
        /*	Isotope Posrtfolio
         /*===========================================================*/
        if (jQuery.isFunction(jQuery.fn.isotope)) {
            jQuery('.portfolio_list').isotope({
                itemSelector: '.list_item',
                layoutMode: 'fitRows',
                animationEngine: 'jquery'
            });

            /* ---- Filtering ----- */
            jQuery('#filter li').click(function () {
                var $this = jQuery(this);
                if ($this.hasClass('selected')) {
                    return false;
                } else {
                    jQuery('#filter .selected').removeClass('selected');
                    var selector = $this.attr('data-filter');
                    $this.parent().next().isotope({filter: selector});
                    $this.addClass('selected');
                    return false;
                }
            });
        }


        /*----------------------------------------------------*/
        /*	Magnific Popup
         /*----------------------------------------------------*/
        $('body').magnificPopup({
            type: 'image',
            delegate: 'a.mfp-gallery',
            fixedContentPos: true,
            fixedBgPos: true,
            overflowY: 'auto',
            closeBtnInside: true,
            preloader: true,
            removalDelay: 0,
            mainClass: 'mfp-fade',
            gallery: {enabled: true},
            callbacks: {
                buildControls: function () {
                    console.log('inside');
                    this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
                }
            }
        });

        $('.mfp-image').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            mainClass: 'mfp-fade',
            image: {
                verticalFit: true
            }
        });

        $('.mfp-youtube, .mfp-vimeo, .mfp-gmaps').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 0,
            preloader: false,
            fixedContentPos: false
        });

        /*----------------------------------------------------*/
        /*	Swipe Slider
         /*----------------------------------------------------*/
        window.mySwipe = new Swipe(document.getElementById('slider'), {
            startSlide: 2,
            speed: 400,
            auto: 3000,
            continuous: true,
            disableScroll: false,
            stopPropagation: false,
            callback: function (index, elem) {
            },
            transitionEnd: function (index, elem) {
            }
        });

        /*----------------------------------------------------*/
        /*	Accordians
         /*----------------------------------------------------*/

        $('.accordion').on('shown.bs.collapse', function (e) {
            $(e.target).parent().addClass('active_acc');
            $(e.target).prev().find('.switch').removeClass('fa-plus-circle');
            $(e.target).prev().find('.switch').addClass('fa-minus-circle');
        });
        $('.accordion').on('hidden.bs.collapse', function (e) {
            $(e.target).parent().removeClass('active_acc');
            $(e.target).prev().find('.switch').addClass('fa-plus-circle');
            $(e.target).prev().find('.switch').removeClass('fa-minus-circle');
        });


        /*----------------------------------------------------*/
        /*	Toggles
         /*----------------------------------------------------*/
        $('.toggle').on('shown.bs.collapse', function (e) {
            $(e.target).parent().addClass('active_acc');
            $(e.target).prev().find('.switch').removeClass('fa-plus-circle');
            $(e.target).prev().find('.switch').addClass('fa-minus-circle');
        });
        $('.toggle').on('hidden.bs.collapse', function (e) {
            $(e.target).parent().removeClass('active_acc');
            $(e.target).prev().find('.switch').addClass('fa-plus-circle');
            $(e.target).prev().find('.switch').removeClass('fa-minus-circle');
        });


        /* ------------------ End Document ------------------ */

        /* PORTFOLIO */
        $('.portfolio').hammer().bind('swipeleft', function () {
            $('#carousel-example-generic').carousel('next');
        });
        $('.portfolio').hammer().bind('swiperight', function () {
            $('#carousel-example-generic').carousel('prev');
            return false;
        });

        /* TESTIMONIALS */
        var animationTime = {
            fadeIn: 2000,
            fadeOut: 1000,
            pause: 8000
        };

        //from stackoverflow
        function Timer(callback, delay) {
            var timerId, start, remaining = delay;

            this.pause = function () {
                window.clearTimeout(timerId);
                remaining -= new Date() - start;
            };

            this.resume = function () {
                start = new Date();
                window.clearTimeout(timerId);
                timerId = window.setTimeout(callback, remaining);
            };

            this.resume();
        }

        var testimonials = $('.testimonial').length;

        var timer;

        var anim = function (element) {
            $('.testimonial' + element).addClass('active');
            timer = new Timer(function () {
                $('.testimonial' + element).removeClass('active');
                anim((element === testimonials ? 1 : element + 1));
            }, animationTime.pause);
        };

        //pause and resume animation on hover
        $('.testimonial').hover(function () {
            if (timer) {
                timer.pause()
            }
        }, function () {
            if (timer) {
                timer.resume();
            }
        });

        //initialization
        if (testimonials > 1) {
            anim(1);
        }
        else {
            $('section.testimonials').css('display', 'none');
        }


        /* PROCESS */
        var descriptions = [
            {
                step: 1,
                title: "Your idea",
                content: 'Our representative and expert meet with you to talk through your ' +
                'idea, discuss user stories and create first image of potential product. On this stage we will advise you ' +
                'what is best possible set of features in terms of current mobile standards and how to prioritize them, ' +
                'which system versions your application should support etc.'
            },

            {
                step: 2,
                title: 'Product preparation & advisement',
                content: 'Now it\'s time for us to make even more ' +
                'effort to prepare solid and reliable vision of your future application. We have intensive brainstorms ' +
                'about product design and user experience.'
            },

            {
                step: 3,
                title: 'Closing the deal',
                content: 'At this point it\'s really close to transform an idea to an ' +
                'ongoing project. After approval of all documents from both sides we are ready to start engineering and ' +
                'make you happy!'
            },

            {
                step: 4,
                title: 'UI',
                content: 'If you dont have graphic mockups or you don\'t know how to handle UI, we ' +
                'will do it for you. Before we accede to development process, we have to transform previous models into ' +
                'pixel perfect visualizations. At this stage we translate user stories into clear and efficient user ' +
                'interface keeping UX on a high level.'
            },

            {
                step: 5,
                title: 'Development in Scrum',
                content: 'Now it\'s the time for development part of engineering. ' +
                'We work in Scrum methodology to hold on to effective management of a whole project. All starts with a ' +
                'Product Backlog and all tasks are systematically implemented during two-weeks Sprints. After every Sprint ' +
                'you\'re able to monitor current progress of our work, therefore this approach gives you constanius update ' +
                'on current stage of the project.'
            },

            {
                step: 6, title: 'Heavy QA', content: 'After coding we perform heavy QA tests on different devices ' +
            '(smartphones and tablets), screen sizes and densities to make sure that developed application is ready to ' +
            'be used by wide range of users.'
            },

            {
                step: 7,
                title: 'Deployment',
                content: 'In this part we release you application to Google Play, App Store or provide ' +
                'executable file to you. Also, we prepare documentation, so implementing potential future features will be ' +
                'piece of cake.'
            },

            {
                step: 8, title: 'Customer Support', content: 'We provide support of created product on many levels. ' +
            'Starting from basic things like answering questions, through making changes, to implementing new features ' +
            'requested by you.'
            }
        ];
        var activeStep = 1;
        var activeStepSmall = 1;
        var description = $('#process-description');
        var title = description.find('h3');
        var content = description.find('p');

        var descriptionSmall = $('#process-description-small');
        var titleSmall = descriptionSmall.find('h3');
        var contentSmall = descriptionSmall.find('p');

        $('.inactive-first').css('opacity', '0.2');
        title.text(descriptions[activeStep - 1].step + '. ' + descriptions[activeStep - 1].title);
        titleSmall.text(descriptions[activeStep - 1].step + '. ' + descriptions[activeStep - 1].title);
        content.text(descriptions[activeStep - 1].content);
        contentSmall.text(descriptions[activeStep - 1].content);

        var settings = {
            active: 1,
            preActive: 0.3,
            inactive: 0.2,
            duration: 600
        };

        var setActiveStep = function (index) {
            var tempActiveStep = activeStep;
            if (index !== activeStep) {
                $('#step-' + index).fadeTo(settings.duration, settings.active);
                if (index - 1 > 0) {
                    $('#step-' + ( index - 1 )).fadeTo(settings.duration, settings.preActive);
                }
                for (var i = 1; i <= 8; i++) {
                    if (i !== Number(index) && i !== (index - 1)) {
                        $('#step-' + i).fadeTo(settings.duration, settings.inactive);
                    }
                }
                description.fadeOut(settings.duration / 2, function () {
                    title.text(descriptions[index - 1].step + '. ' + descriptions[index - 1].title);
                    content.text(descriptions[index - 1].content);
                    description.fadeIn(settings.duration / 2);
                });
                activeStep = index;
                $('#nav-' + tempActiveStep).removeClass('active');
                $('#nav-' + activeStep).addClass('active');
            }
        };

        var windowHeight = $(window).height();
        var setActiveStepSmall = function () {
            if ($('.circle').length) {
                var position = $(document).scrollTop(),
                    tempActiveStep = activeStepSmall;
                clearAnimation('circle');
                for (var i = 1; i <= 8; i++) {
                    if ($('#circle-' + i).offset().top < position + windowHeight / 2) {
                        $('#circle-' + i).fadeTo(settings.duration, settings.active);
                        activeStepSmall = i;
                    }
                    else if (i !== 1) {
                        $('#circle-' + i).fadeTo(settings.duration, settings.inactive);
                    }
                }
                if (activeStepSmall !== tempActiveStep) {
                    descriptionSmall.fadeOut(settings.duration / 2, function () {
                        titleSmall.text(descriptions[activeStepSmall - 1].step + '. ' + descriptions[activeStepSmall - 1].title);
                        contentSmall.text(descriptions[activeStepSmall - 1].content);
                        var translate = $(window).width() < 768 ? (activeStepSmall - 1) * 90 - 30 : (activeStepSmall - 1) * 110;
                        if (activeStepSmall === 5) {
                            translate -= 20;
                        }
                        descriptionSmall.css('transform', 'translateY(' + translate + 'px)');
                        descriptionSmall.fadeIn(settings.duration / 2);
                    });
                }
            }
        };

        var clearAnimation = function (element) {
            for (var i = 1; i <= 8; i++) {
                $('#' + element + '-' + i).finish();
            }
            description.finish();
            descriptionSmall.finish();
        };

        var forward = function () {
            if (activeStep === 8) {
                $('#range').val(1);
                setActiveStep(1);
            }
            else {
                $('#range').val((Number(activeStep) + 1) * 10);
                setActiveStep(Number(activeStep) + 1);
            }
        };

        var backward = function () {
            if (activeStep === 1) {
                return false;
            }
            else {
                $('#range').val((Number(activeStep) - 1) * 10);
                setActiveStep(Number(activeStep) - 1);
            }
        };

        $(document).keydown(function (e) {
            if (e.keyCode === 37) {
                clearAnimation('step');
                backward();
            }
            else if (e.keyCode === 39) {
                clearAnimation('step');
                forward();
            }

        });

        $('.nav').click(function () {
            setActiveStep(Number($(this).text()));
        });

        $('.step').click(function () {
            setActiveStep($(this).attr('id').substr(5, 1));
        });

        $(window).on('scroll', function () {
            setActiveStepSmall();
        });

        /* TEAM */
        var personDescription = {
            ag: {
                initials: 'ag',
                name: 'Agnieszka Głowacka',
                description: 'In everyday life I combine natural talent for working with people in a challenging environment of interdisciplinary teams operating under constant pressure of time with enthusiasm for modern technologies. ',
                position: ['Business Development Specialist', null],
                characteristics: ['3D Modeling Enthusiast', 'The Only Girl', 'Always Make People Laugh'],
                contact: {
                    facebook: null,
                    linkedin: 'https://pl.linkedin.com/in/agaglowacka',
                    github: null,
                    globe: null,
                    twitter: 'https://twitter.com/glowacka_aga',
                    at: 'mailto:agnieszka.glowacka@sigmapoint.pl'
                }
            },
            ks: {
                initials: 'ks',
                name: 'Kamil Stanuch',
                description: 'Big fan of Statistics, R, SPSS, Power Point and always happy to help. Graduated from the Jagiellonian University (B.Sc. in Literature , M.Sc. in Social Research & Data Analysis) and Harvard Summer School (Macroeconomics, International Marketing).',
                position: ['Board Member', 'Co-Founder'],
                characteristics: ['Co-Founder at Sigmapoint', 'Lean startup practitioner'],
                contact: {
                    facebook: null,
                    linkedin: 'https://pl.linkedin.com/in/kamilstanuch',
                    github: null,
                    globe: null,
                    twitter: 'https://twitter.com/kamilstanuch'
                }
            },
            mp: {
                initials: 'mp',
                name: 'Mateusz Pluta',
                description: 'Fan of mobile tech and Android (but still bought his wife an iPhone). Deep into agile management.',
                position: ['Board Member', 'Co-Founder'],
                characteristics: ['Co-Founder at Sigmapoint', 'Goodfather'],
                contact: {
                    facebook: null,
                    linkedin: 'https://www.linkedin.com/in/plutamateusz',
                    github: null,
                    globe: null,
                    twitter: null
                }
            },
            kb: {
                initials: 'kb',
                name: 'Kamil Burczyk',
                description: 'I love high quality and simplicity that\'s why I became Apple fan. The same features I value in development so building every product leads to customer satisfaction.',
                position: ['CTO', 'Co-Founder', 'iOS Developer'],
                characteristics: ['Co-Founder at Sigmapoint', 'Fitness and Technology Geek', 'Apple Fan'],
                contact: {
                    facebook: null,
                    linkedin: 'https://pl.linkedin.com/in/kamilburczyk',
                    github: 'https://github.com/burczyk',
                    globe: 'http://blog.sigmapoint.pl',
                    twitter: 'https://twitter.com/KamilBurczyk'
                }
            },
            kt: {
                initials: 'kt',
                name: 'Krzysztof Tsitsaris',
                description: 'Let me help you - Tsitsaris pronounces as \'Cicaris\'.',
                position: ['iOS Developer'],
                characteristics: ['Speaking Greek', 'Speaking Polish', 'Speaking Objective-C', 'Speaking Swift'],
                contact: {
                    facebook: null,
                    linkedin: 'https://pl.linkedin.com/pub/chris-tsitsaris/103/577/571',
                    github: null,
                    globe: null,
                    twitter: null
                }
            },
            kd: {
                initials: 'kd',
                name: 'Kamil Demczuk',
                description: '',
                position: ['Head of Mobile'],
                characteristics: [''],
                contact: {
                    facebook: null,
                    linkedin: null,
                    github: null,
                    globe: null,
                    twitter: null
                }
            },
            jp: {
                initials: 'jp',
                name: 'Jakub Pelczar',
                description: 'Aka \'Mystery\'. I\'ve got more secrets than code lines written. Then why don\'t we talk about you?',
                position: ['Android Developer'],
                characteristics: ['Lanos Fanboy', 'Jedi', 'Grill Master'],
                contact: {
                    facebook: 'https://www.facebook.com/kubapelczar',
                    linkedin: ' https://pl.linkedin.com/in/jakubpelczar',
                    github: 'https://github.com/jpelczar',
                    globe: null,
                    twitter: null
                }
            },
            pz: {
                initials: 'pz',
                name: 'Paweł Żak',
                description: 'Funny fact: when you read my initials, it will sound like "Peugeot". Just use your imagination!',
                position: ['Android Developer'],
                characteristics: ['Libraries Finder', 'Nexus Lover'],
                contact: {
                    facebook: null,
                    linkedin: 'https://www.linkedin.com/in/pawelzak',
                    github: null,
                    globe: null,
                    twitter: null
                }
            },
            pb: {
                initials: 'pb',
                name: 'Przemysław Burczyk',
                description: 'There are two great things in the world: Volvo cars and #FF8200',
                position: ['Mobile (Android and Windows Phone) Developer', 'Web Developer'],
                characteristics: ['Sophisticated Joke Master', 'Silent Perfectionist'],
                contact: {
                    facebook: 'https://facebook.com/przemek.burczyk',
                    linkedin: 'https://pl.linkedin.com/in/przemyslawburczyk',
                    github: 'https://github.com/PrzemekBurczyk',
                    globe: null,
                    twitter: null
                }
            },
            kk: {
                initials: 'kk',
                name: 'Karol Manijak',
                description: 'I really like sleeping which force me to be yerba-mate-lover. Fan of minimalism in all aspects of life.',
                position: ['Frontend Developer', 'Web designer'],
                characteristics: ['Almost Graduated Physicist', 'Esthete', 'Movie Maniac'],
                contact: {
                    facebook: null,
                    linkedin: 'https://pl.linkedin.com/in/karolmanijak',
                    github: null,
                    globe: null,
                    twitter: null
                }
            },
            km: {
                initials: 'km',
                name: 'Karol Majta',
                description: 'Lisper imprisoned in a body of JS developer.',
                position: ['Frontend Developer', 'Backend Developer'],
                characteristics: ['I didn\'t say it won\'t work, I said it\'s not *right*'],
                contact: {
                    facebook: null,
                    linkedin: null,
                    github: null,
                    globe: 'http://blog.sigmapoint.pl/author/karol-majta/',
                    twitter: null
                }
            },
            gs: {
                initials: 'gs',
                name: 'Grzegorz Sikorski',
                description: 'The greater the code, the greater the world. Well, then I\'m making the world better.',
                position: ['Senior Developer', 'Backend Developer'],
                characteristics: ['GIT Fighter', 'Golf III Driver', 'Indian Food Lover'],
                contact: {
                    facebook: null,
                    linkedin: 'https://pl.linkedin.com/pub/grzegorz-sikorski/a7/b53/60b',
                    github: null,
                    globe: null,
                    twitter: null
                }
            }
        };

        var setActiveDescription = function(initials) {
            var element = $('.description-center');
            if (initials === 'none') {
                element.animate({
                    opacity: 0
                });
                element.css('pointer-events', 'none');
            }
            else {
                var description = personDescription[initials.substr(1,2)];
                element.animate({
                    opacity: 0
                }, function() {
                    element.find('#name').text(description.name);
                    element.find('#position1').text(description.position[0]);
                    element.find('#position2').hide();
                    if (description.position[1]) {
                        element.find('#position2').text(description.position[1]);
                        element.find('#position2').show();
                    }
                    element.find('#description').text(description.description);
                    element.find('#good-at').empty();
                    _.each(description.characteristics, function(d) {
                        element.find('#good-at').append('<span class="good-at right label label-default label-default-tech">' + d +'</span>');
                    });
                    $.each(description.contact, function(key, value) {
                        element.find('.my-at').hide();
                        if (value) {
                            element.find('.my-' + key).show().attr("href", value);
                        }
                        else {
                            element.find('.my-' + key).hide();
                        }
                    });

                    element.animate({
                        opacity: 1
                    });
                    element.css('pointer-events', 'all');
                });
            }
        };

        var setActivePerson = function (person) {
            $(person).click(function () {
                var initials = person.substr(0, 3);
                if (!activePerson) {
                    $.each(_.omit(personDescription, initials.substr(1,2)), function(key, value) {
                        console.log(key);
                        $('.' + key + '.person.hoverable').animate({
                            opacity: inactive
                        });
                        $('.' + key + '.line').animate({
                            opacity: inactive
                        });
                    });
                    $('.background').show();
                    setActiveDescription(initials);
                    activePerson = initials;
                }
                else {
                    if (initials !== activePerson) {
                        setActiveDescription(initials);
                        $(activePerson + '.hoverable').animate({
                            opacity: inactive,
                            'z-index': 50
                        });
                        $(activePerson + '.line').animate({
                            opacity: inactive,
                            'z-index': 5
                        });
                        $(initials + '.hoverable').animate({
                            opacity: 1,
                            'z-index': 100
                        });
                        $(initials + '.line').animate({
                            opacity: 1,
                            'z-index': 6
                        });
                        activePerson = initials;
                    }
                    else {
                        setActiveDescription('none');
                        $.each(personDescription, function(key, value) {
                            console.log(key);
                            $('.' + key + '.person.hoverable').animate({
                                opacity: 1
                            });
                            $('.' + key + '.line').animate({
                                opacity: 1
                            });
                        });
                        $('.background').hide();
                        activePerson = null;
                    }
                }
            });
        };

        var setHoverForPerson = function (initials) {
            $(initials + '.person.hoverable').hover(function () {
                if (activePerson) {
                    $(this).animate({
                        opacity: 1
                    });
                }
            }, function () {
                if (activePerson && initials !== activePerson) {
                    $(this).animate({
                        opacity: inactive
                    }, 100);
                }
            });
        };

        var createDescriptionsForMobile = function() {
            var mobileView = $('.mobile-team');
            _.each(personDescription, function(man) {
                var toAppend = '';
                toAppend += '<div class="worker">' +
                '<div class="row">' +
                '<div class="col-sm-3 col-xs-12 vcenter">' +
                '<div class="person ' + man.initials + '"></div></div><!--' +
                '--><div class="col-sm-9 col-xs-12 vcenter">' +
                '<h2 class="name">' + man.name + '</h2>' +
                '<h6><span class="position label label-default label-default-tech">' + man.position[0] + '</span>';

                if (man.position[1]) {
                    toAppend += '<span class="position label label-default label-default-tech">' + man.position[1] + '</span>';
                }

                toAppend += '</h6><p class="description">' + man.description +'</p>' +
                '<h6>' +
                'Characteristics:' +
                '<div class="good-at">';

                _.each(man.characteristics, function(feature) {
                    toAppend += '<span class="good-at right label label-default label-default-tech">' + feature + '</span>';
                });

                toAppend += '</div>' +
                '</h6>' +
                '<h1 class="contact">';

                $.each(man.contact, function(key, value) {
                    if (value) {
                        toAppend += '<a href="' + value + '" class="my-' + key + '" target="_blank"><i class="fa fa-' + key + '"></i></a>';
                    }
                });

                toAppend += '</h1>' +
                '</div></div><hr>';

                mobileView.append(toAppend);
            });
        };

        $('.background').click(function() {
            setActiveDescription('none');
            $.each(personDescription, function(key, value) {
                $('.' + key + '.person.hoverable').animate({
                    opacity: 1
                });
                $('.' + key + '.line').animate({
                    opacity: 1
                });
            });
            $('.background').hide();
            activePerson = null;
        });


        //Initials
        createDescriptionsForMobile();

        setHoverForPerson('.ag');
        setHoverForPerson('.ks');
        setHoverForPerson('.mp');
        setHoverForPerson('.kb');
        setHoverForPerson('.kd');
        setHoverForPerson('.jp');
        setHoverForPerson('.pz');
        setHoverForPerson('.pb');
        setHoverForPerson('.km');
        setHoverForPerson('.gs');
        setHoverForPerson('.kk');
        setHoverForPerson('.kt');

        setActivePerson('.ag.person.hoverable');
        setActivePerson('.ks.person.hoverable');
        setActivePerson('.mp.person.hoverable');
        setActivePerson('.kb.person.hoverable');
        setActivePerson('.kd.person.hoverable');
        setActivePerson('.jp.person.hoverable');
        setActivePerson('.pz.person.hoverable');
        setActivePerson('.pb.person.hoverable');
        setActivePerson('.km.person.hoverable');
        setActivePerson('.gs.person.hoverable');
        setActivePerson('.kk.person.hoverable');
        setActivePerson('.kt.person.hoverable');

        $('.description-center').fadeTo(0, 0);
        $('.description-center').css('pointer-events', 'none');
        $('.background').hide();

        var inactive = 0.1;

        var activePerson = null;
    });
})(this.jQuery);

$(document).ready(function() {

    /*=================
     *	Contact Form
     * #contact
     ===================*/

    try{
        jQuery('#contact').validate({
            submitHandler: function(form) {
                jQuery('#contact .message').hide();
                var ajaxurl = 'contact.php';
                var data = {
                    action: 'contact_us',
                    datas: jQuery(form).serialize()
                };

                jQuery.ajax({
                    type: 'POST',
                    url: ajaxurl,
                    data: data,
                    success: function(response){
                        jQuery('#contact .message').text(response.error).css({'display' : 'inline-block'});
                    },
                    dataType: 'json'
                });
                return false;
            },
            rules: {
                c_name: {
                    required: true,
                    minlength: 3
                },
                c_mail: {
                    required: true,
                    email: true
                },
                c_subject: {
                    required: true,
                    minlength: 6
                },
                c_message:{
                    required: true,
                    minlength: 20
                }
            }
        });
    }catch(e){

    }

    /*============
     BUTTON UP
     * ===========*/
    var btnUp = $('<div/>', {'class':'btntoTop'});
    btnUp.appendTo('body');
    $(document)
        .on('click', '.btntoTop', function() {
            $('html, body').animate({
                scrollTop: 0
            }, 700);
        });

    $(window)
        .on('scroll', function() {
            if ($(this).scrollTop() > 200)
                $('.btntoTop').addClass('active');
            else
                $('.btntoTop').removeClass('active');
        });
});

$(document).ready(function(){
  /*============
  MIXPANEL CALLBACKS
  ============*/
  $("#btn_hire_us").click(function(event) {
    event.preventDefault();
    mixpanel.track("click 'Hire us!'");
  });
  mixpanel.track('page visit');
  mixpanel.track_links("#id_contact a", "click contact link");
  mixpanel.track_links(".contact-bar a", "click social link");
  mixpanel.track_links(".footer_social a", "click social link");
  mixpanel.track_links(".tags a", "click technology link");
  mixpanel.track_links(".navbar-collapse a", "click navigation link");
  mixpanel.track_links(".our_clients a", "click client link");
});

/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch, iPad, and Android mobile phones
 * Common usage: wipe images (left and right to show the previous or next image)
 *
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 */
(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);
