//slide_to_section

$('document').ready(function() {
    function session_link(from, to) {
        $(from).click(function() {
            $('html,body').animate({
                scrollTop: $(to).offset().top,

            }, 500);
        })
    }

    session_link('#practical', '#practical_session');
    session_link('#research', '#research_session');
    session_link('#art', '#art_session');
    session_link('#social', '#social_session');
    session_link('#enterprise', '#enterprise_session');
    session_link('#thing', '#thing_session');



    //to_test

    $('#close_test').click(function() {
        $('#go_test').addClass('_off');
    });
})