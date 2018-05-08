/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


    $('a.add').click(function () {
        if ($('.bigWrapper .wrapper').length <= 4) {
            $('.wrapper.temp').clone().removeClass('temp').css('display', 'none').appendTo('.bigWrapper').slideDown('normal');
        } else
            alert('Numarul maxim de pasageri este 5');
       $('a.remove').css('display',"inline-block");
    });

    $('a.remove').click(function () {
        if ($('.bigWrapper .wrapper').length > 1) {
            $('.bigWrapper .wrapper:last-child').slideUp('normal', function () {
                $('.bigWrapper .wrapper:last-child').remove();
            });
        }
        if ($('.bigWrapper .wrapper').length == 2) {
            $('a.remove').css('display',"none");
        }
    });
    
    $('input[data-validation*="mandatory"]').after("<span class='required'>*</span>");
    $('input[data-validation*="alternative"]').after("<span class='alternative'>*</span>");



