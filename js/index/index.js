//fullpage

$(document).ready(function() {
    $('.fullpage').fullpage({
        menu: '.header_wrap',
        sectionSelector: 'section',
        paddingTop: '100px',
        easing: 'easeInCirc',
        navigation: true,
        navigationPosition: 'right',
        //導航小圓點的tooltips設定，預設為[]，注意按照順序設定 
        navigationTooltips: ["職涯分析", "行業攻略", "職涯論壇", "探索課程", "時光明信片"],
        //是否顯示當前頁面的導航的tooltip資訊，預設為false 
        showActiveTooltip: true,
        // css3 false才可以背景fixed
        css3: false,
        scrollingSpeed: 1200,


    });

    //第一屏圓圈
    var tl = new TimelineMax({
        repeat: -1,
        repeatDelay: 10
    }).timeScale(4);

    var dots = $("svg .dot");
    var cruveG = $("svg g");

    for (var i = 0; i < dots.length; i++) {
        tl.set(dots[i], { scale: 0 });
    }
    for (var i = 0; i < cruveG.length; i++) {
        tl.set(cruveG[i], { opacity: 0 });
    }

    for (var i = 0; i < dots.length; i++) {
        (function(d, l, tl) {
            tl.to(d, 1, { transformOrigin: "50% 50%", scale: 0, duration: .1, ease: Power0.easeInOut });
            tl.to(d, 1, { transformOrigin: "50%% 50%", scale: 23, duration: .1, ease: Power0.easeInOut });
            tl.to(d, 1, { transformOrigin: "50% 50%", scale: 0, duration: 2, ease: Power0.easeInOut });
            tl.to(l, 1, { transformOrigin: "50% 50%", opacity: 1, duration: 2, ease: Power0.easeInOut }, "-=1");
        })(dots[i], cruveG[i], tl);
    }


    //論壇&課程&post card輪播


});



// 排行榜

// var HorizontalBarGraph = function(el, series) {
//     this.el = d3.select(el);
//     this.series = series;
// };

// HorizontalBarGraph.prototype.draw = function() {
//     var x = d3.scaleLinear()
//         .domain([0, d3.max(this.series, function(d) { return d.value })])
//         .range([0, 100]);

//     var segment = this.el
//         .selectAll(".horizontal-bar-graph-segment")
//         .data(this.series)
//         .enter()
//         .append("div").classed("horizontal-bar-graph-segment", true);
//     //classed("class", true/flase)->true代表加上class
//     segment
//         .append("div").classed("horizontal-bar-graph-label", true)
//         .text(function(d) { return d.label });

//     segment
//         .append("div").classed("horizontal-bar-graph-value", true)
//         .append("div").classed("horizontal-bar-graph-value-bar", true)
//         .style("background-color", function(d) { return d.color })
//         .text(function(d) { return d.inner_label ? d.inner_label : "" })
//         .transition()
//         // .duration(1000)
//         // .delay(1000)
//         .style("min-width", function(d) { return x(d.value) + "%" });

// };

// var graph = new HorizontalBarGraph('#graph', [
//     { label: "醫生", inner_label: "50000", value: 50, color: "#FFE56D" },
//     { label: "老師", inner_label: "40000", value: 40, color: "#F6F3ED" },
//     { label: "品檢人員", inner_label: "30000", value: 30, color: "#BCEAFF" }
// ]);
// graph.draw();