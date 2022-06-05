(function($) {
    'use strict';
    /*==================================================================
        [ Daterangepicker ]*/
    try {
        $('.js-datepicker').daterangepicker({

            "singleDatePicker": true,
            "showDropdowns": true,
            "autoUpdateInput": false,
            locale: {
                format: 'YYYY-MM-DD',
                "applyLabel": "Uygula",
                "cancelLabel": "Vazgeç",
                "daysOfWeek": [
                    "Pt",
                    "Sl",
                    "Çr",
                    "Pr",
                    "Cm",
                    "Ct",
                    "Pz"
                ],
                "monthNames": [
                    "Ocak",
                    "Şubat",
                    "Mart",
                    "Nisan",
                    "Mayıs",
                    "Haziran",
                    "Temmuz",
                    "Ağustos",
                    "Eylül",
                    "Ekim",
                    "Kasım",
                    "Aralık"
                ]
            },
        });

        var myCalendar = $('.js-datepicker');
        var isClick = 0;

        $(window).on('click', function() {
            isClick = 0;
            console.log("Click");
        });

        $(myCalendar).on('apply.daterangepicker', function(ev, picker) {
            isClick = 0;
            $(this).val(picker.startDate.format('YYYY-MM-DD'));

        });

        $('.js-btn-calendar').on('click', function(e) {
            e.stopPropagation();

            if (isClick === 1) isClick = 0;
            else if (isClick === 0) isClick = 1;

            if (isClick === 1) {
                myCalendar.focus();
            }
        });

        $(myCalendar).on('click', function(e) {
            e.stopPropagation();
            isClick = 1;
        });

        $('.daterangepicker').on('click', function(e) {
            e.stopPropagation();
        });


    } catch (er) { console.log(er); }
    /*[ Select 2 Config ]
        ===========================================================*/

    try {
        var selectSimple = $('.js-select-simple');

        selectSimple.each(function() {
            var that = $(this);
            var selectBox = that.find('select');
            var selectDropdown = that.find('.select-dropdown');
            console.log("sss");
            selectBox.select2({
                dropdownParent: selectDropdown
            });
        });

    } catch (err) {
        console.log(err);
    }

    /// City Funcs
    try {
        document.getElementById("citySelect").onchange = function() {
            console.log(document.getElementById("citySelect").value);

            // Load District 
            loadDistrict(document.getElementById("citySelect").value);
        };
    } catch (error) {

    }
    loadCity();


    document.getElementById('phone').addEventListener('keyup', function(evt) {
        var phone = document.getElementById('phone');
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        phone.value = phoneFormat(phone.value);
    });

})(jQuery);

function loadCity() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        let response = JSON.parse(this.responseText);
        if (!response.success) {
            console.log("error");
            return;
        }

        let citySelect = document.getElementById("citySelect");
        for (let index = 0; index < response.data.length; index++) {
            let data = response.data[index];

            // Create option
            let option = document.createElement('option');
            option.value = data.id;
            option.text = data.name;
            citySelect.appendChild(option);
        }
    }
    xhttp.open("GET", "https://test.bizimevapi.com/common/cities", true);
    xhttp.send();
}

function loadDistrict(id) {
    const xhttp = new XMLHttpRequest();
    console.log("District : (city) " + id);
    xhttp.onload = function() {
        let response = JSON.parse(this.responseText);
        if (!response.success) {
            console.log("error");
            return;
        }

        let districtSelect = document.getElementById("districtSelect");
        for (let index = 0; index < response.data.length; index++) {
            let data = response.data[index];

            // Create option
            let option = document.createElement('option');
            option.value = data.id;
            option.text = data.name;
            districtSelect.innerHTML = "";
            districtSelect.appendChild(option);
        }
    }
    xhttp.open("GET", "https://test.bizimevapi.com/common/towns?cityId=" + id, true);
    xhttp.send();
}


// Phone Funcs
function phoneFormat(input) {
    // Strip all characters from the input except digits
    input = input.replace(/\D/g, '');

    // Trim the remaining input to ten characters, to preserve phone number format
    input = input.substring(0, 12);

    // Based upon the length of the string, we add formatting as necessary
    var size = input.length;
    console.log("Size : " + size);
    if (size < 2) {
        input = 90;
    } else if (size < 11) {
        console.log("bum");
        input = 90 + input.substring(2, 11);
    }
    return input;
}