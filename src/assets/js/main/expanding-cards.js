
expandingCards();

function expandingCards(){
    var contentStore = {};
    var storeState = false;
    $('.visible-card-info').on('click', function(){
        var $this = $(this);
        var $card = $this.parents('.expanding-cards__card');
        var $cardContainer = $card.parents('.expanding-cards');
        var setHeight = $this.siblings('.card-drawer').children('.card-drawer__content').outerHeight();
        var drawer = $this.siblings('.card-drawer');
        var closedHeight = $this.outerHeight();
        var openHeight = closedHeight + setHeight + 40;
        var $cardActive =  $('.card-active');
        var activeOffset = 0;
        var $drawerActive = $this.parents().parents().children('.drawer-active');
        if($cardActive.length) activeOffset = $cardActive.offset().top;

        /*
        add class to cotainer to prevent anyclick events durring animation time
        */

        //checks if an animation is in progress if
        if (!$cardContainer.hasClass('animating')){
            if (drawer.outerHeight() === 0 && !$card.hasClass('card-active')){
                //checks if the selected card is on the same row as the currently active card
                if(activeOffset === $card.offset().top){
                    $cardContainer.addClass('animating');
                    if($drawerActive.length){
                        $cardActive.removeClass('card-active');
                    }else {
                        $cardActive.addClass('drawer-active').removeClass('card-active');
                    }
                    $drawerActive = $this.parents().parents().children('.drawer-active');
                    $card.addClass('card-active');
                    $drawerActive.css({'min-height': openHeight});
                    $drawerActive.children('.card-drawer').css({'min-height': setHeight });
                    //saving the value of the first item in a row to be clicked on when store state is false.
                    if(storeState === false){
                        contentStore.setHeight = $drawerActive.children('.card-drawer').children('.card-drawer__content').outerHeight(),
                            contentStore.openHeight = $drawerActive.children('.visible-card-info').outerHeight() + contentStore.setHeight + 40,
                            contentStore.content = $drawerActive.children('.card-drawer').html()
                        storeState = true;
                    }
                    var setContent = $this.siblings('.card-drawer').html();
                    $drawerActive.children('.card-drawer').html(setContent);
                    setTimeout(function(){$cardContainer.removeClass('animating');},400);
                    // if selected card is in a different row
                } else {
                    // if card-drawer is open in a different row
                    if(storeState === true){
                        $cardContainer.children('.drawer-active').children('.card-drawer').css({'min-height': 0 });
                        setTimeout(function(){
                            $cardContainer.children('.drawer-active').css({'min-height': 0 });
                        },150);
                        setTimeout(function(){
                            $cardContainer.children('.drawer-active').children('.card-drawer').html(contentStore.content);
                            $cardContainer.children('.drawer-active').removeClass('drawer-active');
                            storeState = false;
                        },400);
                    }
                    $cardContainer.addClass('animating');
                    $cardActive.children('.card-drawer').css({'min-height': 0 });
                    setTimeout(function(){
                        $cardActive.css({'min-height': 0 });
                        $cardActive.removeClass('card-active');
                    },150);
                    $card.css({'min-height': openHeight});
                    $card.addClass('card-active');
                    setTimeout(function(){
                        $this.siblings('.card-drawer').css({'min-height': setHeight });
                    },150);
                    setTimeout(function(){$cardContainer.removeClass('animating');},400);
                }
                //when card with class drawer-active is clicked on
            } else if($card.hasClass('drawer-active')){
                $cardContainer.addClass('animating');
                $card.parents().children('.card-active').removeClass('card-active');
                $card.removeClass('drawer-active').addClass('card-active');
                $this.siblings('.card-drawer').css({'min-height': contentStore.setHeight });
                $card.css({'min-height': contentStore.openHeight });
                $card.children('.card-drawer').html(contentStore.content);
                setTimeout(function(){$cardContainer.removeClass('animating');},400);
                //when and active card is clicked
            } else {
                if($drawerActive.length){
                    $cardContainer.addClass('animating');
                    $drawerActive.children('.card-drawer').css({'min-height': 0 });
                    setTimeout(function(){
                        $drawerActive.css({'min-height': 0});
                        $card.removeClass('card-active');
                    },150);
                    setTimeout(function(){
                        $this.parents().parents().children('.drawer-active').children('.card-drawer').html(contentStore.content);
                        storeState = false;
                        $drawerActive.removeClass('drawer-active');
                    },400);
                    setTimeout(function(){$cardContainer.removeClass('animating');},400);
                } else {
                    $cardContainer.addClass('animating');
                    $card.removeClass('card-active');
                    $this.siblings('.card-drawer').css({'min-height': 0 });
                    setTimeout(function(){
                        $card.css({'min-height': 0 });
                    },150);
                    setTimeout(function(){$cardContainer.removeClass('animating');},400);
                }
            }
        }
    });


    $(document).on('click', '.card-drawer__content .close-drawer', function(){
        var $this = $(this);
        var $drawer = $this.parents('.card-drawer__content').parents('.card-drawer');
        var $card = $drawer.parents('.expanding-cards__card');
        var $cardContainer = $card.parents('.expanding-cards');

        if (!$cardContainer.hasClass('animating')){
            if($card.hasClass('drawer-active') || true){
                $cardContainer.addClass('animating');
                $cardContainer.children('.card-active').removeClass('card-active');
                $card.removeClass('drawer-active');
                $drawer.css({'min-height': 0 });
                setTimeout(function(){
                    $card.css({'min-height': 0 });
                },150);
                setTimeout(function(){
                    $card.children('.card-drawer').html(contentStore.content);
                }, 400);
                setTimeout(function(){$cardContainer.removeClass('animating');},400);
            }
        }
    });
}