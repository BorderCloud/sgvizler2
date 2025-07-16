import { Core, Chart, MESSAGES, Logger } from '../../sgvizler';
/**
 * Enum for tri-state values.
 * @readonly
 * @enum {number}
 */
var DATATABLE_COL_OPTIONS;
(function (DATATABLE_COL_OPTIONS) {
    DATATABLE_COL_OPTIONS[DATATABLE_COL_OPTIONS["TAG"] = 0] = "TAG";
    DATATABLE_COL_OPTIONS[DATATABLE_COL_OPTIONS["STYLE"] = 1] = "STYLE";
})(DATATABLE_COL_OPTIONS || (DATATABLE_COL_OPTIONS = {}));
/**
 * This table uses <a href="https://datatables.net/">DataTables.net</a>.
 * You can adapt each column with the option colstyle.
 *
 * @class bordercloud.visualization.DataTable
 * @memberof bordercloud.visualization
 */
export class DataTable extends Chart {
    constructor() {
        super();
        this.addCss(Core.path + 'lib/DataTables/DataTables-1.10.21/css/dataTables.bootstrap4.min.css');
        this.addCss(Core.path + 'lib/DataTables/Responsive-2.2.5/css/responsive.bootstrap4.min.css');
        this.addCss(Core.path + 'lib/DataTables/Buttons-1.6.2/css/buttons.bootstrap4.min.css');
        let jqueryDataTables = this.addScript(Core.path + 'lib/DataTables/DataTables-1.10.21/js/jquery.dataTables.min.js');
        let dataTablesBootstrap4 = this.addScript(Core.path + 'lib/DataTables/DataTables-1.10.21/js/dataTables.bootstrap4.min.js', jqueryDataTables);
        let dataTablesResponsive = this.addScript(Core.path + 'lib/DataTables/Responsive-2.2.5/js/dataTables.responsive.js', dataTablesBootstrap4);
        this.addScript(Core.path + 'lib/DataTables/Responsive-2.2.5/js/responsive.bootstrap4.js', dataTablesResponsive);
        let dataTablesButtons = this.addScript(Core.path + 'lib/DataTables/Buttons-1.6.2/js/dataTables.buttons.min.js', dataTablesBootstrap4);
        let buttonsBootstrap4 = this.addScript(Core.path + 'lib/DataTables/Buttons-1.6.2/js/buttons.bootstrap4.min.js', dataTablesButtons);
        let buttons = this.addScript(Core.path + 'lib/DataTables/Buttons-1.6.2/js/buttons.flash.min.js', buttonsBootstrap4);
        this.addScript(Core.path + 'lib/DataTables/JSZip-2.5.0/jszip.min.js', buttons);
        let pdfmake = this.addScript(Core.path + 'lib/DataTables/pdfmake-0.1.36/pdfmake.min.js', buttons);
        this.addScript(Core.path + 'lib/DataTables/pdfmake-0.1.36/vfs_fonts.js', pdfmake);
        this.addScript(Core.path + 'lib/DataTables/Buttons-1.6.2/js/buttons.html5.min.js', buttons);
        this.addScript(Core.path + 'lib/DataTables/Buttons-1.6.2/js/buttons.print.min.js', buttons);
    }
    /**
     * This function parses colStyle option and build the parameter ColumnDef of DataTable
     * Example :
     * "colStyle=col2_img_max-width:250px;col2_img_border-radius:50%;col2_img_display:block;col2_img_margin:auto;col3_img_max-width:300px;col3_img_max-height:300px;col2_img_opacity:0.5"
     *
     * @param {string} codeStyle
     * @param {number} noCols
     * @returns {Array<any>}
     */
    static buildColumnDefs(codeStyle, noCols) {
        // noinspection Annotator
        let regex = / *col([0-9]+)\_([a-zA-Z]+)\_([^=;\n]*) */ig;
        let m;
        let datasetColumnsDefs = [];
        let datasetColumnsFunc;
        let colOptions = [];
        let optionCol;
        let isModified;
        // init
        for (let c = 0; c < noCols; c++) {
            colOptions[c] = [];
            colOptions[c][DATATABLE_COL_OPTIONS.TAG] = '';
            colOptions[c][DATATABLE_COL_OPTIONS.STYLE] = '';
        }
        // noinspection TsLint
        while ((m = regex.exec(codeStyle)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            optionCol = parseInt(m[1], 10);
            colOptions[optionCol][DATATABLE_COL_OPTIONS.TAG] = m[2];
            colOptions[optionCol][DATATABLE_COL_OPTIONS.STYLE] += m[3] + ';';
        }
        for (let c = 0; c < noCols; c++) {
            isModified = true;
            switch (colOptions[c][DATATABLE_COL_OPTIONS.TAG]) {
                case 'img':
                    datasetColumnsFunc = this.getFunctionColumnDefImg(colOptions[c][DATATABLE_COL_OPTIONS.STYLE]);
                    break;
                case 'span':
                    datasetColumnsFunc = this.getFunctionColumnDefSpan(colOptions[c][DATATABLE_COL_OPTIONS.STYLE]);
                    break;
                /**/
                case 'video':
                    datasetColumnsFunc = this.getFunctionColumnDefVideo(colOptions[c][DATATABLE_COL_OPTIONS.STYLE]);
                    break;
                default:
                    isModified = false;
                    datasetColumnsFunc = this.getFunctionColumnDefDefault();
            }
            // noinspection TsLint
            datasetColumnsDefs[c] = {
                'targets': c,
                // "data": "description",
                'render': datasetColumnsFunc,
                'isModified': isModified
            };
        }
        return datasetColumnsDefs;
    }
    static getFunctionColumnDefDefault() {
        return (function (data, type, full, meta) {
            return data;
        });
    }
    static getFunctionColumnDefImg(style) {
        return (function (data, type, full, meta) {
            return '<img src="' + data + '"  style="' + style + '"\>';
        });
    }
    static getFunctionColumnDefVideo(style) {
        return (function (data, type, full, meta) {
            let youtubePattern = new RegExp('youtu');
            let facebookPattern = new RegExp('facebook');
            let mediawikiPattern = new RegExp('commons\.wikimedia\.org');
            if (youtubePattern.test(data)) {
                let url = data.replace('watch?v=', 'embed/');
                return '<iframe  style="' + style + '" src="' + url + '" meta http-equiv="X-Frame-Options" content="allow" frameborder="0" allowfullscreen></iframe>';
            }
            else if (facebookPattern.test(data)) {
                //data = 'https://www.facebook.com/XXXX/videos/XXXXX/' // example
                //doc https://developers.facebook.com/docs/plugins/embedded-video-player
                return '<iframe src="https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent(data) + '&show_text=0&width=560" style="border:none;overflow:hidden;' + style + '" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>';
            }
            else if (mediawikiPattern.test(data)) {
                //data = 'https://commons.wikimedia.org/wiki/File%3AAuguste_%26_Louis_Lumi%C3%A8re-_L'Arroseur_arros%C3%A9_(1895).webm' // example
                //return '<iframe src="' + data + '?embedplayer=false" style="' + style + '" frameborder="0" allowfullscreen></iframe>'
                //doc http://html5video.org/wiki/Rewriting_HTML5_Media_Elements
                return '<video controls style="' + style + '"><source src="' + data + '"></video>';
            }
            else {
                return '<iframe  style="' + style + '" src="' + data + '" meta http-equiv="X-Frame-Options" content="allow" frameborder="0" allowfullscreen></iframe>';
            }
        });
    }
    static getFunctionColumnDefSpan(style) {
        return (function (data, type, full, meta) {
            return '<span style="' + style + '"\>' + data + '</span>';
        });
    }
    get icon() {
        return 'fa fa-table';
    }
    get label() {
        return 'DataTable';
    }
    get subtext() {
        return 'DataTable';
    }
    get classFullName() {
        return 'bordercloud.visualization.DataTable';
    }
    get tutorialFilename() {
        return 'tutorial-bordercloud_visualization_DataTable.html';
    }
    /**
     * Draw a chart
     * Available options:
     * - 'class' :  css class (default: "table table-striped table-bordered")
     * - 'cellspacing'   : cellspacing of table  (default: "0")
     * - 'width'   :  width (default: "100%")
     * - 'colStyle'   :   (default: "")
     *
     * Example :
     * "colStyle=col2_img_max-width:250px;col2_img_border-radius:50%;col2_img_display:block;col2_img_margin:auto;col3_img_max-width:300px;col3_img_max-height:300px;col2_img_opacity:0.5"
     *
     * @param {SparqlResultInterface} result
     * @returns {Promise< any >}
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // precondition
            let obj = document.getElementById(currentChart.container.id);
            if (!obj) {
                Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART_UNKNOWN, [currentChart.container.id]);
                return resolve();
            }
            try {
                const optionsDateTime = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
                let lang = currentChart.container.lang;
                let cols = result.head.vars;
                let rows = result.results.bindings;
                let row;
                let datasetRow;
                let noCols = cols.length;
                let noRows = rows.length;
                let idChart = currentChart.container.id + '-datatable';
                let datasetColumns = [];
                let datasetColumnsDefs;
                let dataset = [];
                let tableElement = document.createElement('table');
                let tableId = document.createAttribute('id');
                let tableClass = document.createAttribute('class');
                let tableCellSpacing = document.createAttribute('cellspacing');
                let tableWidth = document.createAttribute('width');
                let opt = Object.assign({
                    'class': 'table table-striped table-bordered',
                    'cellspacing': '0',
                    'width': '100%',
                    'colstyle': undefined
                }, currentChart.options);
                for (let c = 0; c < noCols; c++) {
                    datasetColumns[c] = { title: cols[c].replace("_", " ") };
                }
                if (opt.colstyle !== undefined) {
                    datasetColumnsDefs = DataTable.buildColumnDefs(opt.colstyle, noCols);
                }
                for (let r = 0; r < noRows; r++) {
                    row = rows[r];
                    datasetRow = [];
                    // loop cells
                    for (let c = 0; c < noCols; c += 1) {
                        if (row[cols[c]] !== undefined) {
                            if (datasetColumnsDefs === undefined || !datasetColumnsDefs[c].isModified) {
                                if (row[cols[c]].type === "uri") {
                                    datasetRow[c] = '<a href="' + row[cols[c]].value + '" target="_blank">' + row[cols[c]].value + '</a>';
                                }
                                else { //litteral
                                    switch (row[cols[c]].datatype) {
                                        case 'http://www.w3.org/2001/XMLSchema#dateTime':
                                            // @ts-ignore
                                            datasetRow[c] = (new Date(row[cols[c]].value)).toLocaleDateString(lang, optionsDateTime);
                                            break;
                                        case 'http://www.w3.org/2001/XMLSchema#date':
                                            datasetRow[c] = (new Date(row[cols[c]].value)).toLocaleDateString(lang);
                                            break;
                                        default:
                                            datasetRow[c] = row[cols[c]].value;
                                    }
                                }
                            }
                            else {
                                datasetRow[c] = row[cols[c]].value;
                            }
                        }
                        else {
                            datasetRow[c] = '';
                        }
                    }
                    dataset[r] = datasetRow;
                }
                tableId.value = idChart;
                tableClass.value = opt.class;
                tableCellSpacing.value = opt.cellspacing;
                tableWidth.value = opt.width;
                tableElement.setAttributeNode(tableId);
                tableElement.setAttributeNode(tableClass);
                tableElement.setAttributeNode(tableCellSpacing);
                tableElement.setAttributeNode(tableWidth);
                obj.appendChild(tableElement);
                $.fn.dataTable.Buttons.defaults.dom.button.className = "btn btn-outline-dark btn-sm";
                $('#' + idChart).DataTable({
                    bSort: false,
                    data: dataset,
                    columns: datasetColumns,
                    columnDefs: datasetColumnsDefs,
                    dom: "<'row'<'col'B><'col-auto'l><'col-sm-6'f>>" + "<'row'<'col-sm-12'tr>>" + "<'row'<'col-sm-5'i><'col-sm-7'p>>",
                    buttons: [
                        {
                            extend: 'csv',
                            text: '<i class="fas fa-lg fa-file-csv align-text-bottom"></i>',
                            titleAttr: 'CSV'
                        },
                        {
                            extend: 'pdf',
                            text: '<i class="fas fa-lg fa-file-pdf align-text-bottom"></i>',
                            titleAttr: 'PDF'
                        },
                        {
                            extend: 'print',
                            text: '<i class="fas fa-lg fa-print align-text-bottom"></i>',
                            titleAttr: 'print'
                        }
                    ],
                    "language": DataTable.geti18n(lang)
                });
            }
            catch (e) {
                return reject(e);
            }
            // finish
            return resolve();
        });
    }
    static geti18n(lang) {
        switch (lang) {
            case 'fr':
                return {
                    "sProcessing": "Traitement en cours...",
                    "sSearch": "Rechercher&nbsp;:",
                    "sLengthMenu": "Afficher _MENU_ &eacute;l&eacute;ments",
                    "sInfo": "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
                    "sInfoEmpty": "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment",
                    "sInfoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
                    "sInfoPostFix": "",
                    "sLoadingRecords": "Chargement en cours...",
                    "sZeroRecords": "Aucun &eacute;l&eacute;ment &agrave; afficher",
                    "sEmptyTable": "Aucune donn&eacute;e disponible dans le tableau",
                    "oPaginate": {
                        "sFirst": "Premier",
                        "sPrevious": "Pr&eacute;c&eacute;dent",
                        "sNext": "Suivant",
                        "sLast": "Dernier"
                    },
                    "oAria": {
                        "sSortAscending": ": activer pour trier la colonne par ordre croissant",
                        "sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
                    }
                };
            default: //en
                return {
                    "sEmptyTable": "No data available in table",
                    "sInfo": "Showing _START_ to _END_ of _TOTAL_ entries",
                    "sInfoEmpty": "Showing 0 to 0 of 0 entries",
                    "sInfoFiltered": "(filtered from _MAX_ total entries)",
                    "sInfoPostFix": "",
                    "sInfoThousands": ",",
                    "sLengthMenu": "Show _MENU_ entries",
                    "sLoadingRecords": "Loading...",
                    "sProcessing": "Processing...",
                    "sSearch": "Search:",
                    "sZeroRecords": "No matching records found",
                    "oPaginate": {
                        "sFirst": "First",
                        "sLast": "Last",
                        "sNext": "Next",
                        "sPrevious": "Previous"
                    },
                    "oAria": {
                        "sSortAscending": ": activate to sort column ascending",
                        "sSortDescending": ": activate to sort column descending"
                    }
                };
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YVRhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2JvcmRlcmNsb3VkL3Zpc3VhbGl6YXRpb24vRGF0YVRhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxJQUFJLEVBQ0osS0FBSyxFQUVMLFFBQVEsRUFDUixNQUFNLEVBQ1QsTUFBTSxnQkFBZ0IsQ0FBQTtBQUl2Qjs7OztHQUlHO0FBQ0gsSUFBSyxxQkFHSjtBQUhELFdBQUsscUJBQXFCO0lBQ3RCLCtEQUFHLENBQUE7SUFDSCxtRUFBSyxDQUFBO0FBQ1QsQ0FBQyxFQUhJLHFCQUFxQixLQUFyQixxQkFBcUIsUUFHekI7QUFFRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLE9BQU8sU0FBVSxTQUFRLEtBQUs7SUFFaEM7UUFDSSxLQUFLLEVBQUUsQ0FBQTtRQUNQLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxxRUFBcUUsQ0FBQyxDQUFBO1FBQzlGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxtRUFBbUUsQ0FBQyxDQUFBO1FBQzVGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyw2REFBNkQsQ0FBQyxDQUFBO1FBRXRGLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLCtEQUErRCxDQUFDLENBQUE7UUFDbEgsSUFBSSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsbUVBQW1FLEVBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUMzSSxJQUFJLG9CQUFvQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyw2REFBNkQsRUFBQyxvQkFBb0IsQ0FBQyxDQUFBO1FBQ3pJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUks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