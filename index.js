const sections = [
    '#header',
    '#about',
    '#portfolio',
    '#last-section',
];

function onScroll() {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

    const offset = 30;
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

    (scrollPos > 350) ? $('.top-btn').fadeIn(300) : $('.top-btn').fadeOut(300);
    (scrollPos > 350) ? $('.img-as-bg').fadeIn(300) : $('.img-as-bg').fadeOut(300);
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

    onScroll(); $(window).scroll(onScroll);

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

        // TODO: allow use of non-youtube-thumbnail imgs
        const img = $(e).attr("img") || "";

        const ytQ = $(e).attr("ytQ") || "";
        const ytID = $(e).attr("ytID") || "";
        const gitRepo = $(e).attr("gitRepo") || "";
        const vidTitle = $(e).attr("vidTitle") || "";
        const vidDesc = $(e).attr("vidDesc") || "";

        let mainDiv = $("<div>").addClass("video-description");
        let iconSection = $("<section>").addClass("video-links");

        if (ytID && ytID !== "") {
            $(iconSection).append($("<a>")
                .attr("href", `https://www.youtube.com/watch?v=${ytID}`)
                .attr("target", "_blank").append(
                    $('<i class="fab fa-youtube    "></i>')
                )
            );
        }

        if (gitRepo && gitRepo !== "") {
            $(iconSection).append($("<a>")
                .attr("href", `${gitRepo}`)
                .attr("target", "_blank").append(
                    $('<i class="fab fa-github    "></i>')
                )
            )
        }

        if ((ytID && ytID !== "") || (gitRepo && gitRepo !== "")) {
            $(mainDiv).append(iconSection);
        }

        $(mainDiv)
            .append($("<h3>")
                .addClass("video-description-title")
                .text(vidTitle)
            )
            .append($("<p>")
                .addClass("video-description-content")
                .text(vidDesc)
            );

        $(e)
            .removeAttr("ytQ")
            .removeAttr("ytID")
            .removeAttr("gitRepo")
            .removeAttr("vidTitle")
            .removeAttr("vidDesc")
            .addClass("video")
            .append($("<img>")
                .attr('id', `img_${ytID}`)
                .attr('alt', vidTitle)
                .attr('src', `https://img.youtube.com/vi/${ytID}/` + (
                    (ytQ === "FHD") ? 'maxresdefault.jpg' : 'hqdefault.jpg'
                ))
                .addClass("video-thumb")
            )
            .append(mainDiv);
    });
});
