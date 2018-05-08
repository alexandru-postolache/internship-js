/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$('#form').submit(function (e) {
    resetError();
    var valid = true;

    $('#form .bigWrapper .wrapper').each(function () {
        var alternative = [];
        $(this).find('input').each(function () {


            var value = $(this).val();

            if (typeof value === "string" && value !== null) {
                value = value.trim();
            }
            var validations = $(this).data('validation');

            validations = validations.split(',');

            if (!$(this).data('validation').indexOf('alternative')) {
                alternative.push($(this));
            }


            if (validations[0] !== "alternative") {
                for (var i = 0; i < validations.length; i++) {

                    if (validations[i] == 'date') {
                        var tip = validationObj[validations[i]](value);
                        if (typeof tip !== "undefined" && tip !== false) {
                            $(this).siblings('p.type').html(messageObj['date'](tip));
                        } else {
                            showMessage($(this), messageObj['dateError']);
                        }

                    } else if (!validationObj[validations[i]](value)) {
                        valid = false;
                        showMessage($(this), messageObj[validations[i]]);
                        break;
                    }
                }
            }
            if (!valid) {
                e.preventDefault();
            } else
            {
                showMessage($(this), messageObj['succes']);
            }
        });

        var validAlternative = false;
        var validField = true;
        var numField = [];
        var errorMess = [];
        for (var i = 0; i < alternative.length; i++)
        {
            value = alternative[i].val();
            if (typeof value === "string" && value !== "")
            {
                validAlternative = true; //exist field completed
                var validations = alternative[i].data('validation'); //check if field completed is valid
                validations = validations.split(',');
 
                for (var j = 1; j < validations.length; j++) {
                    if (!validationObj[validations[j]](value)) {
                        validField = false;
                        numField.push(i);
                        errorMess.push(validations[j]);
                    }
                }
            }
        }

        if (validAlternative === true && validField === true) {
            for (var i = 0; i < alternative.length; i++)
            {
                showMessage(alternative[i], messageObj['succes']);
            }
        }
        if (validAlternative === true && validField === false)
        {
            console.log("Am eroare la un camp completat");
            for (var i = 0; i < numField.length; i++)
            {
                showMessage(alternative[numField[i]], messageObj[errorMess[i]]);

            }
        }
        if (validAlternative === false)
        {
            for (var i = 0; i < alternative.length; i++)
            {
                showMessage(alternative[i], messageObj['alternative'])
            }
        }
    });
});


var count = 0;

var validationObj = {
    mandatory: function (value) {
        if (typeof value !== "string" || value === null || value == "") {
            return false;
        }
        return true;
    },
    email: function (value) {
        //check if your email has passed the test with regular expression
        var rez = /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/.test(value);
        if (rez === false) {
            return false;
        }
        return true;
    },
    mobilePhone: function (value) {
        var mobilePhoneWS = value.replace(/ /g, '');
        var digits = /^[0-2][0-9]{9,10}$/; // The phone number must have between 9 and 10 digits and start with digits between 0 and 3.
        if ((digits.test(mobilePhoneWS))) {
            return true;
        } else {
            return false;
        }
    },
    phone: function (value) {
        var phoneWS = value.replace(/ /g, '');
        var digits = /^[0-2][0-9]{9,10}$/;
        // The phone number must have between 9 and 10 digits and start with digits between 0 and 3.
        if ((digits.test(phoneWS))) {
            return true;
        } else {
            return false;
        }
    },
    date: function (value) {
        var currentDate = new Date();
        var minYear = 1905;
        var maxYear = currentDate.getFullYear();
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var date = value;

        var age;
        var x = date.split("-");
        x[0] = parseInt(x[0]);
        x[1] = parseInt(x[1]);
        x[2] = parseInt(x[2]);

        if (x[0] < minYear || x[0] > maxYear) {
            return false;
        }
        var age = (maxYear - x[0]);
        var intervals = [
            {min: 0, max: 1, type: "bebelus"},
            {min: 1, max: 12, type: "copil"},
            {min: 12, max: 65, type: "adult"},
            {min: 65, max: maxYear - minYear, type: "senior"}
        ];
        var tip = null;
        for (var i in intervals) {
            if ((age > intervals[i].min) && (age < intervals[i].max)) {
                tip = intervals[i].type;
                return tip;
            }
            if (age === intervals[i].min) {
                if (x[1] > month) {
                    tip = intervals[--i].type;

                } else {
                    if (x[1] <= month) {
                        tip = intervals[i].type;

                    }
                }
            }
            if (age === intervals[i].max) {
                if (x[1] > month) {
                    tip = intervals[i].type;

                } else {
                    if (x[1] <= month) {
                        tip = intervals[++i].type;

                    }
                }
            }
            if (tip !== null) {
                return tip;
                break;
            }
        }
    },
    name: function (value) {
        {
            
            var name = value;

            //Apply a regular expression for verification
            var rez = /^[A-Za-z][A-Za-z0-9\s\-\.]+$/i.test(name);

            if (typeof name !== "string")
                return false;
            
            //checks the name passed with regular expression or contains at least 3 characters
            if (name.length < 3 || rez == false )
            {
                return false; //numele introdus nu este valid
            }

            /*
             * ucwords
             */
            if (rez)
            {
                var str = name.split(/[\s-]+/);
                name = "";
                for (var i = 0; i < str.length; i++)
                {
                    name = name + " " + str[i].charAt(0).toUpperCase() + str[i].substr(1);
                }

            }
            return true;
        }
    },
    alternative: function (value) {
        return true;

    }
};

var messageObj = {
    "node": "<p class='error'></p>",
    "mandatory": "Campul este obligatoriu!",
    "name": "Campul nume este invalid !",
    "email": "Campul email este invalid !",
    "alternative": "Cel putin unul din aceste campuri trebuie completat!",
    "mobilePhone": "Campul telefon mobil este invalid",
    "phone": "Campul telefon fix este invalid!",
    "succes": "",
    date: function (value) {
        return "Biletul dumneavoastra este de tip " + value;
    },
    dateError: "Campul data nasterii este invalid!"

};

function showMessage(input, message) {
    if (!$(input).next().next('p.error').length) {
        $(input).next().after(messageObj['node']);
        $(input).next().next().html(message);
    } else
        $(input).next().next().html(message);
}


function resetError() {
    $('p.error').html("");
}
