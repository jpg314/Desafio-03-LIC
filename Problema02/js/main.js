
"use strict";

$(document).ready(function () {

  // Configurar FullPage.js
  new fullpage("#fullpage", {
    licenseKey: "gplv3-license",
    autoScrolling: true,
    navigation: true,
    navigationPosition: "right",
    scrollingSpeed: 850,
    fitToSection: true,
    css3: true,
    //secciones
    anchors: [
      "inicio",
      "presentacion",
      "proyectos",
      "galeria",
      "contacto"
    ],
  
    //detectar el cambio de seccion
    onLeave: function (origin, destination) {
      // Actualizar navegación superior
      $(".navbar nav a").removeClass("active");

      $('.navbar nav a[href="#' +
        destination.anchor + '"]').addClass("active");

      // Desplazamiento gradual de la portada
      if (origin.index === 0) {
        $(".home-image img").css(
          "--parallax", "-45px"
        );
      }

      if (destination.index === 0) {
        $(".home-image img").css(
          "--parallax", "0px"
        );
      }
    },

    afterLoad: function (origin, destination) {
      // Las animaciones de entrada se activan
      // mediante la clase .active de FullPage.js.
    }
  });

  // Navegación mediante enlaces jquery
  $(".navbar nav a, .main-button").on(
    "click",
    function (evento) {
      const destino = $(this).attr("href");
//validacion
      if (destino && destino.startsWith("#")) {
        evento.preventDefault();
        //desplazamiento 
        fullpage_api.moveTo(destino.substring(1));
      }
    }
  );

  //  Validación del formulario jquery
  $("#contactForm").on("submit", function (evento) {
    evento.preventDefault();

    const nombre = $("#nombre").val().trim();
    const correo = $("#correo").val().trim();
    const mensaje = $("#mensaje").val().trim();

    const correoValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    $("#formMessage").css("color", "#ff9e9e");

    if (nombre.length < 3) {
      $("#formMessage").text(
        "Escribe un nombre de al menos 3 caracteres."
      );
      return;
    }

    if (!correoValido.test(correo)) {
      $("#formMessage").text(
        "Introduce un correo electrónico válido."
      );
      return;
    }

    if (mensaje.length < 10) {
      $("#formMessage").text(
        "Tu reflexión debe tener al menos 10 caracteres."
      );
      return;
    }

    $("#formMessage")
      .css("color", "#b8ef48")
      .text(
        "Reflexión validada correctamente. " +
        "Este formulario es una demostración; " +
        "no se ha enviado a un servidor."
      );

    this.reset();
  });

});
