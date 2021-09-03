const urlParams = new URLSearchParams(window.location.search);
const categories = urlParams.get("categories");
 
const url = "http://kea-alt-del.dk/t7/api/products?category=" + categories;
fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    handleProductList(data);
  });
 
function handleProductList(data) {
  //console.log(data);
  data.forEach(showProduct);
}
 
function showProduct(product) {
  console.log(product);
  const template = document.querySelector("#smallProductTemplate").content;
  const copy = template.cloneNode(true);
 
  copy.querySelector("a").setAttribute("href", "porduct.html?id=" + product.id);
 
  copy.querySelector(
    "img"
  ).src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
 
  copy.querySelector(
    ".subtle"
  ).textContent = `${product.articletype} | ${product.brandname}`;
  copy.querySelector("h3").textContent = product.productdisplayname;
 
  if (product.soldout) {
    copy.querySelector("article").classList.add("soldOut");
  }
  if (product.discount) {
    copy.querySelector("article").classList.add("onSale");
  }
 
  copy.querySelector(".discounted p").textContent =
    product.price / product.discount;
 
  const parent = document.querySelector("main");
 
  parent.appendChild(copy);
}
 
/*
<article class="smallProduct">
            <img src="  https://kea-alt-del.dk/t7/images/webp/640/1530.webp"
                alt="Sahara Team India Fanwear Round Neck Jersey" />
            <h3>Sahara Team India Fanwear Round Neck Jersey</h3>
            <p class="subtle">Tshirts | Puma</p>
            <p class="price"><span>Prev.</span> DKK 1595,-</p>
            <div class="discounted">
                <p>Now DKK 1560,-</p>
                <p>-34%</p>
            </div>
            <a href="porduct.html">Read More</a>
        </article>
        */