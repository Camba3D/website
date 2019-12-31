function setFades(scrollPos, offsetY, id) {
    const fadeTime = 300;

    (scrollPos > offsetY)
        ? $(id).fadeIn(fadeTime)
        : $(id).fadeOut(fadeTime);
}

function onScroll() {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

    const offset = 30;
    const sections = ['#header', '#about', '#portfolio', '#last-section'];

    for (let i = 0; i < sections.length - 1; i++) {
        const val = sections[i];
        const changeHash =
            (val !== window.location.hash) &&
            $(val).offset().top < scrollPos + offset &&
            $(val).offset().top + $(val).height() > scrollPos + offset;

        if (changeHash) {
            window.history.pushState({}, "", val);
        }
    }

    setFades(scrollPos, 350, '.top-btn');
    setFades(scrollPos, 350, '.img-as-bg');
}

function jqueryBtnScrollSmooth(btnID, sectionID) {
    $(btnID).click(() => {
        $('html,body').animate({ scrollTop: $(sectionID).offset().top }, 'slow');
        window.history.pushState({}, "", sectionID);
    });
}

function isChrome() {
    return /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());
}

$(document).ready(() => {

    onScroll();
    $(window).scroll(onScroll);

    if (!isChrome()) {
        jqueryBtnScrollSmooth("#btn-about", "#about");
        jqueryBtnScrollSmooth("#btn-portfolio", "#portfolio");
        jqueryBtnScrollSmooth(".top-btn", "#header");
    } else {
        $("html").addClass("smooth-scroll");
        $(".top-btn").attr("href", "#header");
        $("#btn-about").attr("href", "#about");
        $("#btn-portfolio").attr("href", "#portfolio");
    }

    // Populate thumbs with links and info
    $('video-container').each((_, e) => {

        const img = $(e).attr("img") || "";
        const ytID = $(e).attr("ytID") || "";
        const slides = $(e).attr("slides") || "";
        const gitRepo = $(e).attr("gitRepo") || "";
        const vidTitle = $(e).attr("vidTitle") || "";
        const vidDesc = $(e).attr("vidDesc") || "";
        $(e).removeAttr("ytQ ytID slides gitRepo vidTitle vidDesc");

        // Main elements
        let mainDiv = $("<div>").addClass("video-description");
        let iconSection = $("<section>").addClass("video-links");

        // Youtube link and icon
        if (ytID && ytID !== "") {
            $(iconSection).append($("<a>")
                .attr("href", `https://www.youtube.com/watch?v=${ytID}`)
                .attr("target", "_blank").append($('<i>').addClass('icon-youtube-play'))
            );
        }

        // Git link and icon
        if (gitRepo && gitRepo !== "") {
            $(iconSection).append($("<a>")
                .attr("href", `${gitRepo}`)
                .attr("target", "_blank").append($('<i>').addClass('icon-github-circled'))
            );
        }

        // Slides link and icon
        if (slides && slides !== "") {
            $(iconSection).append($("<a>")
                .attr("href", `${slides}`)
                .attr("target", "_blank").append($('<i>').addClass('icon-doc-text-inv'))
            );
        }

        // If exist 'git' or 'youtube' links append icons section
        if ((ytID && ytID !== "") || (gitRepo && gitRepo !== "")) {
            $(mainDiv).append(iconSection);
        }

        // Append thumb title and description
        $(mainDiv)
            .append($("<h3>")
                .addClass("video-description-title")
                .text(vidTitle)
            )
            .append($("<p>")
                .addClass("video-description-content")
                .text(vidDesc)
            );

        // Complete portfolio div
        $(e)
            .addClass("video")
            .append($("<img>")
                .addClass("lazy")
                .addClass("video-thumb")
                .attr('alt', vidTitle)
                .attr('data-src', ((img && img !== "") ? img : `https://img.youtube.com/vi/${ytID}/0.jpg`))
            )
            .append(mainDiv);
    });

    yall();
});
