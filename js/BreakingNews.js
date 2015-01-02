(function (e) {
  $.fn.BreakingNews = function (e) {
    var t = {

    };
    var e = $.extend(t, e);
    return this.each(function () {
      function i(t) {
        if (t == "next") {
          if ($(e.modulid + " ul li").length > n) n++;
          else n = 1
        } else {
          if (n - 2 == -1) n = $(e.modulid + " ul li").length;
          else n = n - 1
        } if (e.effect == "fade") {
          $(e.modulid + " ul li").css({
            display: "none"
          });
          $(e.modulid + " ul li").eq(parseInt(n - 1)).fadeIn()
        } else {
          $(e.modulid + " ul").animate({
            marginTop: -($(e.modulid + " ul li").height() + 20) * (n - 1)
          })
        }
      }

      function s() {
        $.ajax({
          type: "GET",
          url: document.location.protocol + "//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=" + encodeURIComponent(e.data),
          dataType: "json",
          success: function (t) {
            veri = t.responseData.feed.entries;
            news = "";
            $(veri).each(function (t, n) {
              if (e.effect == "slide") news = news + '<li style="display:block"><a style="color:' + e.linkcolor + "; font-weight:" + fontw + "; height:" + parseInt(e.fonttextsize) + 6 + '" href="' + veri[t].link + '">' + veri[t].title + "</a></li>";
              else news = news + '<li style="display:none"><a style="color:' + e.linkcolor + "; font-weight:" + fontw + "; height:" + (parseInt(e.fonttextsize) + 6) + 'px" href="' + veri[t].link + '">' + veri[t].title + "</a></li>"
            });
            $(e.modulid + " ul").html("");
            $(e.modulid + " ul").append(news);
            $(e.modulid + " ul").find("li:first").css({
              display: "block"
            });
            $(e.modulid + " ul li a").hover(function () {
              $(this).css({
                color: e.linkhovercolor
              })
            }, function () {
              $(this).css({
                color: e.linkcolor
              })
            })
          },
          error: function () {
            $(e.modulid + " ul").html("RSS Feed Error!")
          }
        })
      }
      e.modulid = "#" + $(this).attr("id");
      var t = e.modulid;
      var n = 1;
      var r = true;
      if (e.data != false) {
        $(e.modulid + " ul").append('<li style="display:block"><a>Loading ...</a></li>');
        s();
        r = false
      }
      if (e.isbold == true) fontw = "bold";
      else fontw = "normal"; if (e.effect == "slide") $(e.modulid + " ul li").css({
        display: "block"
      });
      else $(e.modulid + " ul li").css({
        display: "none"
      });
      $(e.modulid + " .bn-title").html(e.title);
      $(e.modulid).css({
        width: e.width,
        background: e.background,
        border: e.border,
        "font-size": e.fonttextsize
      });
      $(e.modulid + " ul").css({
        left: $(e.modulid + " .bn-title").width() + 40
      });
      $(e.modulid + " .bn-title").css({
        background: e.titlebgcolor,
        color: e.titlecolor,
        "font-weight": fontw
      });
      $(e.modulid + " ul li a").css({
        color: e.linkcolor,
        "font-weight": fontw,
        height: parseInt(e.fonttextsize) + 6
      });
      $(e.modulid + " ul li").eq(parseInt(n - 1)).css({
        display: "block"
      });
      if (r == true) {
        $(e.modulid + " ul li a").hover(function () {
          $(this).css({
            color: e.linkhovercolor
          })
        }, function () {
          $(this).css({
            color: e.linkcolor
          })
        })
      }
      $(e.modulid + " .bn-arrows span").click(function (e) {
        if ($(this).attr("class") == "bn-arrows-left") i("prev");
        else i("next")
      });
      if (e.autoplay == true) {
        t = setInterval(function () {
          i("next")
        }, e.timer);
        $(e.modulid).hover(function () {
          clearInterval(t)
        }, function () {
          t = setInterval(function () {
            i("next")
          }, e.timer)
        })
      } else {
        clearInterval(t)
      }
      $(window).resize(function (t) {
        if ($(e.modulid).width() < 360) {
          $(e.modulid + " .bn-title").html("&nbsp;");
          $(e.modulid + " .bn-title").css({
            width: "4px",
            padding: "10px 0px"
          });
          $(e.modulid + " ul").css({
            left: 4
          })
        } else {
          $(e.modulid + " .bn-title").html(e.title);
          $(e.modulid + " .bn-title").css({
            width: "auto",
            padding: "10px 20px"
          });
          $(e.modulid + " ul").css({
            left: $(e.modulid + " .bn-title").width() + 40
          })
        }
      })
    })
  }
})(jQuery)
