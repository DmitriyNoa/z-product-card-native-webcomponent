customElements.define("z-product-card",
  class ZProductCard extends HTMLElement {

    constructor() {
      super();

      let styles = document.getElementById("productStyles");

      this.template = document.createElement("div");

      let shadowRoot = this.attachShadow({mode: 'open'});

      this.onProductLiked = this.onProductLiked.bind(this);

      this.template.innerHTML = `
      <div class="z-product-card">
        <button class="z-product-card-wishlist" id="likedBtn">
          <span class="z-icon z-icon-wishlist z-icon-small z-icon-black z-product-card-wishlist_icon"></span>
        </button>
        <div class="z-product-image">
          <img src="${this.product.image}" alt="Zalando" class="z-product-image_image" />
        </div>
        <div class="z-product-card-details">
          <div class="z-product-card-title ">
            <span class="z-text z-product-card-title_brand z-text-block z-text-detail-text-bold z-text-black">${this.product.name}</span>
            <span class="z-text z-product-card-title_name z-text-block z-text-detail-text-regular z-text-black">${this.product.name}</span>
          </div>
          <div class="z-product-card-price">
            <span class="z-text z-product-card-price_price is-sale z-text-block z-text-detail-text-regular z-text-black">${this.product.price.old}</span>
            <span class="z-text z-product-card-price_sale-price z-text-block z-text-detail-text-regular z-text-black">${this.product.price.current}</span>
          </div>
        </div>
      </div>`;

      shadowRoot.appendChild(this.template.cloneNode(true));
      shadowRoot.appendChild(styles.cloneNode(true));

      shadowRoot.querySelector("#likedBtn").addEventListener("click", this.onProductLiked);
    }

    onProductLiked(evt) {
      let productLiked = new CustomEvent("liked", {
        detail: this.product
      });
      this.dispatchEvent(productLiked);
    }

    get product() {
      return this.getAttribute('product') ? JSON.parse(this.getAttribute('product')) : {};
    }


  });


window.onload = function () {
  document.querySelector("z-product-card").addEventListener("liked", function (evt) {
    console.log("Product was liked", evt.detail);
  });
};