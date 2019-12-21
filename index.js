$(document).ready(() => {

    // Set behaviour to auto scroll from header to content
    $('#btnHeaderDown').click(() => {
        $('html,body').animate(
            { scrollTop: $('main').offset().top },
            'slow'
        );
    });

    // Populate thumbs with links and info
    $('video-container').each((_, e) => {

        // TODO: allow use of non-youtube-thumbnail imgs
        const img = $(e).attr("img") || "";

        const ytQ = $(e).attr("ytQ") || "";
        const ytID = $(e).attr("ytID") || "";
        const gitRepo = $(e).attr("gitRepo") || "";
        const vidTitle = $(e).attr("vidTitle") || "";
        const vidDesc = $(e).attr("vidDesc") || "";

        let mainDiv = $("<div>")

        if (ytID && ytID !== "") {
            $(mainDiv).addClass("video-description").append($("<a>")
                .attr("href", `https://www.youtube.com/watch?v=${ytID}`)
                .attr("target", "_blank").append(
                    $('<i class="fab fa-youtube    "></i>')
                )
            );
        }

        if (gitRepo && gitRepo !== "") {
            $(mainDiv).append($("<a>")
                .attr("href", `${gitRepo}`)
                .attr("target", "_blank").append(
                    $('<i class="fab fa-github    "></i>')
                )
            )
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

    // $('.videoFHD').each((_, e) => {
    //     e.append(getImg(
    //         `img_${e.id}`,
    //         `Thumb of video ${e.id}`,
    //         `https://img.youtube.com/vi/${e.id}/maxresdefault.jpg`
    //     ));
    // });
    // $('.videoHD').each((_, e) => {
    //     e.append(getImg(
    //         `img_${e.id}`,
    //         `Thumb of video ${e.id}`,
    //         `https://img.youtube.com/vi/${e.id}/hqdefault.jpg`
    //     ));
    // });
});
