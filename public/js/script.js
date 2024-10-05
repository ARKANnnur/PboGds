$(document).ready(() => {
    $('#loginGds').hide();
    $('#loginAbsen').hide();
    $('#gds').click(() => {
        $('#option').hide();
        $('#loginGds').show(1000);
    });
    $('#absen').click(() => {
        $('#option').hide();
        $('#loginAbsen').show(1000);
    });
    $('#kembaliGds').click(() => {
        $('#loginGds').hide();
        $('#option').show(1000);
    });
    $('#kembaliAbsen').click(() => {
        $('#loginAbsen').hide();
        $('#option').show(1000);
    });
});

// // import to excel
// $("button").click(function () {
//     $("#table-to-xls").table2excel({
//         exclude: ".noExl",
//         name: "Excel Document Name",
//         filename: "myFileName",
//         fileext: ".xls",
//         exclude_img: true,
//         exclude_links: true,
//         exclude_inputs: true
//     });
// });

// // Search input
// function myFunction() {
//     // Declare variables
//     let input, filter, result, txtValue;
//     input = document.querySelector('#myInput');
//     filter = input.value.toUpperCase();
//     result = document.querySelector("#result");

//     // Loop through all list items, and hide those who don't match the search query
//     for (i = 0; i < result.length; i++) {
//         txtValue = a.textContent || a.innerText;
//         if (txtValue.toUpperCase().indexOf(filter) > -1) {
//             li[i].style.display = "";
//         } else {
//             li[i].style.display = "none";
//         }
//     }
// }



