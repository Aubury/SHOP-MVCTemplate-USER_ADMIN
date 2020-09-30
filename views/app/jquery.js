// $(document).ready(function() {
//     $('input#input_text, textarea#textarea2').characterCounter();
// });
$(document).ready(function(){
    var config = {
        height : 280,
        width : 1000,
        fullPage : true,
        linkShowAdvancedTab : false,
        scayt_autoStartup : true,
        enterMode : Number(2),
        toolbar : [
            ['Styles','Bold', 'Italic', 'Underline', '-',
                'NumberedList',
                'BulletedList', 'SpellChecker', '-', 'Undo',
                'Redo', '-', 'SelectAll', 'NumberedList',
                'BulletedList','FontSize' ], [ 'UIColor' ] ]
    };
    $("#ck_texteditor").ckeditor(config);
});