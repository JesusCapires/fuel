
const language = {
    "decimal": "",
    "emptyTable": "No hay información",
    "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
    "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
    "infoFiltered": "(Filtrado de _MAX_ total entradas)",
    "infoPostFix": "",
    "thousands": ",",
    "lengthMenu": "Mostrar _MENU_ Entradas",
    "loadingRecords": "Cargando...",
    "processing": "Procesando...",
    "search": "Buscar:",
    "zeroRecords": "Sin resultados encontrados",
    "paginate": {
        "first": "Primero",
        "last": "Ultimo",
        "next": "Siguiente",
        "previous": "Anterior"
    }
}


const buttons = [
    {
        extend: 'excel',
        className: 'mb-3',
        exportOptions: {
            columns: ':not(:last-child)'
        }
    },
    {
        extend: 'pdf',
        className: 'mb-3',
        exportOptions: {
            columns: ':not(:last-child)'
        }
    },
    {
        extend: 'print',
        className: 'mb-3',
        exportOptions: {
            columns: ':not(:last-child)'
        }
    }

]

const initializeTableSelecciones = () => {
    $('#tablaSelecciones').DataTable({
        lengthMenu: [[100,250,500, -1],[100,250,500, 'Todos']],
        language,
        responsive: true,
    });
}

const tablaDetalleRegistros = () => {
    $('#tableDetailRecords').DataTable({
        dom: 'Bfrtip',
        language,
        buttons,
        order : [1, 'asc'],
        footerCallback: function (row, data, start, end, display) {
            let api = this.api();

            // Remove the formatting to get integer data for summation
            let intVal = function (i) {
                return typeof i === 'string'
                    ? i.replace(/[\$,]/g, '') * 1
                    : typeof i === 'number'
                    ? i
                    : 0;
            };

            // Total over all pages
            totalOk = api.column(2, { page: 'current' }).data().reduce((a, b) => intVal(a) + intVal(b), 0);
            totalNg = api.column(3, { page: 'current' }).data().reduce((a, b) => intVal(a) + intVal(b), 0);
            totalPiezas = api.column(5, { page: 'current' }).data().reduce((a, b) => intVal(a) + intVal(b), 0);
            // api.column(2).footer().innerHTML = '$' + pageTotal + ' ( $' + total + ' total)';
            api.column(2).footer().innerHTML = totalOk;
            api.column(3).footer().innerHTML = totalNg;
            api.column(5).footer().innerHTML = totalPiezas;
        },
        buttons: [
            { extend: 'print', footer: true },
            { extend: 'excelHtml5', footer: true },
            { extend: 'pdfHtml5', footer: true }
        ]

    });
}


const initializeDataTable = (tabla = 'file-export') => {
    $('#'+tabla).DataTable({
        dom: 'Bfrtip',
        buttons,
        language
    });
}

const initializeDataTableDocs = () => {

    $('#file-docs').DataTable({
        language, order : [1, "desc"]
    });
}

$(function (e) {

    // basic datatable
    $('#datatable-basic').DataTable({
        language,
        "pageLength": 10,
        // scrollX: true
    });
    // basic datatable

    // responsive datatable
    $('#responsiveDataTable').DataTable({
        responsive: true,
        language,
        "pageLength": 10,
    });
    // responsive datatable

    // responsive modal datatable
    $('#responsivemodal-DataTable').DataTable({
        responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.modal({
                    header: function (row) {
                        var data = row.data();
                        return data[0] + ' ' + data[1];
                    }
                }),
                renderer: $.fn.dataTable.Responsive.renderer.tableAll({
                    tableClass: 'table'
                })
            }
        },
        language,
        "pageLength": 10,
    });
    // responsive modal datatable
    // file export datatable


    initializeDataTable();
    initializeDataTableDocs();
    // file export datatable

    // delete row datatable
    var table = $('#delete-datatable').DataTable({
        language,
    });
    $('#delete-datatable tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
    $('#button').on("click", function () {
        table.row('.selected').remove().draw(false);
    });
    // delete row datatable

    // scroll vertical
    $('#scroll-vertical').DataTable({
        scrollY: '265px',
        scrollCollapse: true,
        paging: false,
        scrollX: true,
        language,
    });
    // scroll vertical

    // hidden columns
    $('#hidden-columns').DataTable({
        columnDefs: [
            {
                target: 2,
                visible: false,
                searchable: false,
            },
            {
                target: 3,
                visible: false,
            },
        ],
        language,
        "pageLength": 10,
        // scrollX: true
    });
    // hidden columns

    // add row datatable
    var t = $('#add-row').DataTable({

        language: {
            searchPlaceholder: 'Search...',
            sSearch: '',
        },
    });
    var counter = 1;
    $('#addRow').on('click', function () {
        t.row.add([counter + '.1', counter + '.2', counter + '.3', counter + '.4', counter + '.5']).draw(false);
        counter++;
    });
    // add row datatable

});

