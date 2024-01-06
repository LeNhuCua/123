(function ($) {
  "use strict";

  if ($("#searchInput")) {
    $("#searchInput").on("focus", function () {
      $("#searchIcon").css("display", "none");
      $("#searchCloseIcon").css("display", "block");
    });

    $("#searchInput").on("blur", function () {
      $("#searchIcon").css("display", "inline-block");
      $("#searchCloseIcon").css("display", "none");
    });
  }

  $("#myCollapsible").collapse({
    toggle: false,
  });

  $(".collapse").collapse();

  $(".accordion-header").on("click", function () {
    const accordionItem = $(this).parent();
    const accordionContent = accordionItem.find(".accordion-content");

    if (accordionContent.css("display") === "none") {
      accordionContent.css("display", "block");
      $(this).find("i").removeClass("rotate-icon");
    } else {
      accordionContent.css("display", "none");
      $(this).find("i").addClass("rotate-icon");
    }
  });
  $(".dropdown-menu").on("click", function (e) {
    e.stopPropagation();
  });

  $("#searchInput").on("focusin input", function () {
    if ($(this).val().trim() !== "") {
      $("#searchResults").css("display", "none");
      $("#searchResultsValue").css("display", "block");
      $("#overlay").css("display", "block");
      console.log("focusin input");
    } else {
      console.log("focusin inputewwrwerewr");

      $("#searchResults").css("display", "block");
      $("#searchResultsValue").css("display", "none");
      $("#overlay").css("display", "block");
    }
  });
  $("#searchInput").on("focusout", function () {
    if ($(this).val().trim() !== "") {
      $(this).val("");
    }
  });

  $(document).on("mousedown", function (e) {
    if (
      !$(e.target).closest("#searchResults").length &&
      !$(e.target).is("#searchInput")
    ) {
      $("#searchResults").css("display", "none");
      $("#overlay").css("display", "none");
    }
    if (
      !$(e.target).closest("#searchResultsValue").length &&
      !$(e.target).is("#searchInput")
    ) {
      $("#searchResultsValue").css("display", "none");
      $("#overlay").css("display", "none");
    }
  });

  function enableSearchNavigation(
    inputSelector,
    resultsSelector,
    cardSelector
  ) {
    const items = $(resultsSelector + " " + cardSelector);
    let selectedItemIndex = -1;

    $(inputSelector).on("keydown", function (event) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        selectedItemIndex = Math.min(selectedItemIndex + 1, items.length - 1);
        focusOnItem(selectedItemIndex);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        selectedItemIndex = Math.max(selectedItemIndex - 1, -1);
        focusOnItem(selectedItemIndex);
      }
    });

    function focusOnItem(index) {
      items.each(function (i, item) {
        if (i === index) {
          console.log(i);
          $(item).addClass("selected").focus();
        } else {
          $(item).removeClass("selected").blur();
        }
      });
    }
  }
  enableSearchNavigation("#searchInput", "#searchResults", ".card");
  enableSearchNavigation(
    "#searchInput",
    "#searchResultsValue",
    ".list-group-item"
  );

  $(".tablink").on("click", function () {
    const cityName = $(this).data("city");

    $(".city").hide();
    $(".tablink").removeClass("tab-active");

    $("#" + cityName).show();
    $(this).addClass("tab-active");
  });

  $(document).on("click", function (e) {
    // Kiểm tra xem phần tử được nhấp có chứa trong dropdown-content hay không
    if (!$(e.target).closest(".dropdown-content").length) {
      $(".dropdown-content").removeClass("show"); // Ẩn tất cả dropdown-content
    }
  });

  $(".dropdownBtn").on("click", function (e) {
    var dropdownContent = $(this).next(".dropdown-content");
    $(".dropdown-content").not(dropdownContent).removeClass("show"); // Đóng các dropdown khác
    dropdownContent.toggleClass("show");
  });

  // Ngăn chặn việc click trên dropdown-content từ việc đóng dropdown
  $(".dropdown-content").on("click", function (e) {
    e.stopPropagation();
  });

  if ($("#avatar-2").length > 0) {
    console.log("avatar-2");
    var btnCust =
      '<button type="button" class="btn btn-secondary" title="Add picture tags" ' +
      "onclick=\"alert('Call your custom code here.')\">" +
      '<i class="bi-tag"></i>' +
      "</button>";
    $("#avatar-2").fileinput({
      overwriteInitial: true,
      maxFileSize: 1500,
      showClose: false,
      showCaption: false,
      showBrowse: false,
      browseOnZoneClick: true,
      removeLabel: "",
      removeIcon: '<i class="bi-x-lg"></i>',
      removeTitle: "Cancel or reset changes",
      elErrorContainer: "#kv-avatar-errors-2",
      msgErrorClass: "alert alert-block alert-danger",
      defaultPreviewContent:
        '<img src="/samples/default-avatar-male.png" alt="Your Avatar"><h6 class="text-muted">Click to select</h6>',
      layoutTemplates: {main2: "{preview} " + btnCust + " {remove} {browse}"},
      allowedFileExtensions: ["jpg", "png", "gif"],
    });
  }

  $(document).ready(function () {
    var $buttons = $(".dropdownBtn");
    var $allDivs = $(".dropdown-content");

    $buttons.on("click", function (event) {
      var targetId = $(this).data("target");
      var $targetDiv = $("#" + targetId);
      console.log($targetDiv);
      $allDivs.not($targetDiv).hide();

      if ($targetDiv.is(":hidden")) {
        $targetDiv.show();
      } else {
        $targetDiv.hide();
      }

      event.stopPropagation();
    });

    $(document).on("click", function (event) {
      var isClickInsideDropdown = false;

      $buttons.each(function () {
        if ($(this).has(event.target).length !== 0) {
          isClickInsideDropdown = true;
        }
      });

      $allDivs.each(function () {
        if ($(this).has(event.target).length !== 0) {
          isClickInsideDropdown = true;
        }
      });

      if (!isClickInsideDropdown) {
        $allDivs.hide();
      }
    });
  });
})(window.jQuery);
