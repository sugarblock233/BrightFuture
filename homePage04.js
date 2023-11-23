class StickyNavigation {

    constructor() {
        this.currentId = null;
        this.currentTab = null;
        this.tabContainerHeight = 70;
        let self = this;
        $('.navigation-tab').click(function() {
            self.onTabClick(event, $(this));
        });
        $(window).scroll(() => { this.onScroll(); });
        $(window).resize(() => { this.onResize(); });
    }

    onTabClick(event, element) {
        event.preventDefault();
        let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
        $('html, body').animate({ scrollTop: scrollTop }, 600);
    }

    onScroll() {
        this.checkTabContainerPosition();
        this.findCurrentTabSelector();
    }

    onResize() {
        if(this.currentId) {
            this.setSliderCss();
        }
    }

    checkTabContainerPosition() {
        let offset = $('.navigation-tabs').offset().top + $('.navigation-tabs').height() - this.tabContainerHeight;
        if($(window).scrollTop() > offset) {
            $('.navigation-tabs-container').addClass('navigation-tabs-container--top');
        }
        else {
            $('.navigation-tabs-container').removeClass('navigation-tabs-container--top');
        }
    }


    findCurrentTabSelector(element) {
        let newCurrentId;
        let newCurrentTab;
        let self = this;
        $('.navigation-tab').each(function() {
            let id = $(this).attr('href');
            let offsetTop = $(id).offset().top - self.tabContainerHeight;
            let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
            if($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
                newCurrentId = id;
                newCurrentTab = $(this);
            }
        });
        if(this.currentId != newCurrentId || this.currentId === null) {
            this.currentId = newCurrentId;
            this.currentTab = newCurrentTab;
            this.setSliderCss();
        }
    }

    setSliderCss() {
        let width = 0;
        let left = 0;
        if(this.currentTab) {
            width = this.currentTab.css('width');
            left = this.currentTab.offset().left;
        }
        $('.navigation-tab-slider').css('width', width);
        $('.navigation-tab-slider').css('left', left);
    }

}

new StickyNavigation();

// 当用户滚动页面时调用 scrollFunction()
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    // 如果滚动超过20像素，则显示按钮
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("back-to-top").style.display = "block";
    } else {
        document.getElementById("back-to-top").style.display = "none";
    }
}

// 点击按钮时平滑滚动到页面顶部
document.getElementById('back-to-top').addEventListener('click', function(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 指定平滑滚动效果
    });
});

window.addEventListener('scroll', function() {
    document.querySelectorAll('.content-slide').forEach(function(section) {
        var distanceToTop = section.getBoundingClientRect().top;

        if (distanceToTop < window.innerHeight && distanceToTop > -window.innerHeight) {
            section.style.opacity = 1; // 完全不透明
        } else {
            section.style.opacity = 0; // 完全透明
        }
    });
});
