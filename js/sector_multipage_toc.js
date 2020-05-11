/**
 * @file
 * Multipage JS
 */

(function ($, Drupal) {

  'use strict';

  var pagingIsEnabled = true;
  var currentID = 'heading-1';

  /**
   * Multpage TOC
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.multipage_toc = {
    attach: function (context) {
      if ($(".multipage").length > 0) {
        // Check if paging is enabled and handle show / hide if so ..
        $(".cover__navigation .navigation a").click(function () {
          var targetID = $(this).attr('href').toString().replace('#', '');
          setCurrentID(targetID);
          if (pagingIsEnabled) {
            $('.section').hide().prev().hide();
            $('#' + targetID).parents('.section').show();
          }
        });
      }
    }
  };

  /**
   * A pager for the multipage document
   *
   */
  Drupal.behaviors.multipagePager = {
    attach: function (context, settings) {
      if ($(".multipage").length > 0) {
        $(".multipage .section").each(function (e) {
          if (e != 0) {
            $(this).hide();
          }
        });

        $("#next").click(function () {

          $("html, body").animate({scrollTop: $("#content").offset().top}, "fast");

          var nextSection = null;
          var nextTitle = null;

          if ($(".multipage .section:visible").next('.section').length != 0) {
            nextSection = $(".multipage .section:visible").next('.section');
            $(".multipage .section:visible").hide();
            nextSection.show();
          }
          else {
            $(".multipage .section:visible").hide();
            nextSection = $(".multipage .section:first");
            nextSection.show();
          }
          nextTitle = $('.section h2:visible');
          setCurrentID(nextTitle.attr('id'));
          return false;
        });

        $("#previous").click(function () {
          $("html, body").animate({scrollTop: $("#content").offset().top}, "fast");
          var prevSection = null;
          var prevTitle = null;
          if ($(".multipage .section:visible").prev('.section').length != 0) {
            prevSection = $(".multipage .section:visible").prev('.section');
            $(".multipage .section:visible").hide();
            prevSection.show();
          }
          else {
            $(".multipage .section:visible").hide();
            prevSection = $(".multipage .section:last");
            prevSection.show();
          }
          prevTitle = $('.section h2:visible');
          setCurrentID(prevTitle.attr('id'));
          return false;
        });
      }
    }
  };

  /**
   * Toggles if the multipage should be displayed collapsed or expanded
   */
  Drupal.behaviors.togglePaging = {
    attach: function (context, settings) {
      if ($(".multipage").length > 0) {
        // Disable paging
        $('.js-multipage-disable-paging').click(function (e) {
          pagingIsEnabled = false;
          $('ul.pagination').addClass('hidden');
          $('.multipage .section').show();
          $('.js-multipage-enable-paging').removeClass('hidden');
          $('.js-multipage-disable-paging').addClass('hidden');
          return false;
        });

        // Enable paging
        $('.js-multipage-enable-paging').click(function (e) {
          pagingIsEnabled = true;
          $('ul.pagination').removeClass('hidden');
          $('.multipage .section').hide();
          $('#' + currentID).parent('.section').show();
          $('.js-multipage-enable-paging').addClass('hidden');
          $('.js-multipage-disable-paging').removeClass('hidden');
          return false;
        });
      }
    }
  };

  /**
   * If the page is called with an anchor parameter on pageLoad ..
   */
  Drupal.behaviors.jumpToAnchorOnPageLoad = {
    attach: function (context, settings) {
      if ($(".multipage").length > 0) {
        var targetID = window.location.hash.substring(1);
        // sanitation against XSS
        targetID = targetID.replace(/[^a-zA-Z0-9_-]/g, '');
        if (targetID) {
          if ($('#' + targetID).length > 0) {
            setCurrentID(targetID);
            $(".multipage .section").hide();
            $('#' + targetID).parents('.section').show();
            // if (!$('#' + targetID).is(".multipage h2:first")) {
            //   $(".multipage .section:first").hide();
            // }
          }
        }
      }
    }
  };

  /**
   * Anchor links to sections of the multipage that aren't currently active
   * don't work. This makes sure that if an anchor link on the current page is
   * clicked, it becomes the active section.
   */
  Drupal.behaviors.anchorClick = {
    attach: function (context, settings) {
      if ($(".multipage").length > 0) {
        $('.multipage a').click(function(evt) {
          // Gets the anchor.
          var hash = $(this).prop('hash');
          // Checks that the a element clicked has an anchor.
          if(hash && hash.slice(0,1) == '#') {
            var href = $(this).attr('href').toString();
            // Gets the anchor link.
            var targetID = href.substring(href.indexOf("#") + 1);
            // sanitation against XSS.
            targetID = targetID.replace(/[^a-zA-Z0-9_-]/g, '');
            console.log(targetID);
            if ($('#' + targetID)) {
              // Hides the old section, shows the new section.
              setCurrentID(targetID);
              $(".multipage .section").hide();
              $('#' + targetID).parents('.section').show();
            }
          }
        });
      }
    }
  };



  /**
   * Sets the current ID and highlights the anchor link in the ToC
   * @param {Object} id
   */
  function setCurrentID(id) {
    $(".cover__navigation .navigation li").removeClass('active');
    $(".cover__navigation .navigation a[data-rel=\"" + id + "\"]").parent().addClass('active');
    currentID = id;
  }

})(jQuery, Drupal);
