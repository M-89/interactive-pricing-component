class PricingComponent {
  constructor() {
    this.sliders = document.querySelectorAll(".slider");
    this.pageviewsText = document.querySelector("#pageviews-text");
    this.pricing = document.querySelector("#price");
    this.toggle = document.querySelector(".switch input[type=checkbox]");
    this.discount = document.querySelector("#discount");
    this.root = document.querySelector(":root");
  }

  // GETTERS

  getSliders = () => this.sliders;
  getPageviewsText = () => this.pageviewsText;
  getPricing = () => this.pricing;
  getToggle = () => this.toggle;
  getDiscount = () => this.discount;
  getRoot = () => this.root;

  // AUTRES FONCTIONS

  start = () => {
    this.updatePricing();
    this.updateText();
    this.changeSliderBarsColor();
    this.updateSliderThumbs();
  };

  updatePricing = () => {
    // On stocke le plus petit prix dans une variable pour faire des opérations dessus

    let price = 8;

    let pricePerMonth = 0;

    let pageviews = "";

    // Pour chaque slider (mobile et desktop), on itère sur la valeur du slider pour afficher le prix en fonction du nombre de pageviews. On fait les opérations nécessaires à chaque fois pour obtenir ce prix et l'afficher

    this.getSliders().forEach(slider => {
      slider.addEventListener("input", () => {
        switch (slider.value) {
          case "1":
            pageviews = "10K pageviews";
            pricePerMonth = price + ".00";
            break;
          case "2":
            pageviews = "50K pageviews";
            pricePerMonth = price + 4 + ".00";
            break;
          case "3":
            pageviews = "100K pageviews";
            pricePerMonth = price * 2 + ".00";
            break;
          case "4":
            pageviews = "500k pageviews";
            pricePerMonth = price * 3 + ".00";
            break;
          case "5":
            pageviews = "1M pageviews";
            pricePerMonth = price * 4.5 + ".00";
            break;
        }
        // Le texte des pageviews dans le HTML devient l'un des 5 textes en fonction de la valeur du slider

        this.getPageviewsText().innerText = pageviews;

        if (this.getToggle().checked) {
          // Si la case "Yearly billing 25% discount" est cochée, on soustrait 25% au prix et on affiche le prix dans this.pricing
          this.getPricing().innerText = `$${
            pricePerMonth - (25 / 100) * pricePerMonth
          }.00`;
        } else {
          // Sinon on affiche juste le prix dans this.pricing
          this.getPricing().innerText = `$${pricePerMonth}`;
        }
      });
    });
  };

  updateText = () => {
    // Si la taille de l'écran correspond à celle du desktop, on change le texte du discount pour un texte plus long

    const mobileMediaQuery = window.matchMedia("(min-width: 375px)");

    const desktopMediaQuery = window.matchMedia("(min-width: 1280px)");

    if (desktopMediaQuery.matches) {
      this.getDiscount().innerText = "25% discount";
    } else if (mobileMediaQuery.matches) {
      this.getDiscount().innerText = "- 25%";
    }

    desktopMediaQuery.addEventListener("change", () => {
      if (desktopMediaQuery.matches) {
        this.getDiscount().innerText = "25% discount";
      } else if (mobileMediaQuery.matches) {
        this.getDiscount().innerText = "- 25%";
      }
    });
  };

  changeSliderBarsColor = () => {
    // Pour chaque slider (desktop et mobile), on itère sur la valeur du slider, en changeant le dégradé de couleur en fonction
    this.getSliders().forEach(sliderBar => {
      sliderBar.addEventListener("input", () => {
        switch (sliderBar.value) {
          case "1":
            sliderBar.style.background = `var(--light-grayish-blue)`;
            break;
          case "2":
            sliderBar.style.background = `linear-gradient(
          to left, var(--light-grayish-blue) 70%, var(--soft-cyan) 30%)`;
            break;
          case "4":
            sliderBar.style.background = `linear-gradient(
          to left, var(--light-grayish-blue) 20%, var(--soft-cyan) 27%)`;
            break;
          case "5":
            sliderBar.style.background = `var(--soft-cyan)`;
            break;
          default:
            sliderBar.style.background = `linear-gradient(
          to right, var(--soft-cyan) 50%, var(--light-grayish-blue) 50%)`;
            break;
        }
      });
    });
  };

  updateSliderThumbs = () => {
    // Pour chaque thumb de chaque slider (desktop et mobile) on applique le comportement suivant : au clic et en restant appuyé, on change la variable CSS correspondant à la couleur du thumb. On revient à la couleur originale à la fin. On modifie les variables CSS stockées dans :root pour ce faire

    this.getSliders().forEach(thumb => {
      thumb.addEventListener("mousedown", () => {
        this.getRoot().style.setProperty("--thumb-background", "#63b6af");
      });

      thumb.addEventListener("click", () => {
        this.getRoot().style.setProperty("--thumb-background", "#63b6af");
      });

      // On change la couleur du thumb pour un bleu plus clair quand on hover dessus

      thumb.addEventListener("mouseenter", () => {
        this.getRoot().style.setProperty("--thumb-background", "#a5f3eb");
      });

      // Quand la souris sort du thumb il revient à sa couleur de base

      thumb.addEventListener("mouseleave", () => {
        this.getRoot().style.setProperty(
          "--thumb-background",
          "hsl(174, 86%, 45%)"
        );
      });
    });
  };
}

const component = new PricingComponent();

component.start();
