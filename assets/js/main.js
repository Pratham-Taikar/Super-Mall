import { db } from "../../firebase/firebase-config.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

window.compareProducts = async function () {
  const product1 = document.getElementById("product1").value;
  const product2 = document.getElementById("product2").value;
  const resultDiv = document.getElementById("comparisonResult");
  resultDiv.innerHTML = "";

  const q = query(collection(db, "offers"), where("productName", "in", [product1, product2]));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    resultDiv.innerHTML = "<p>No matching products found.</p>";
    return;
  }

  snapshot.forEach(doc => {
    const data = doc.data();
    resultDiv.innerHTML += `<p><strong>${data.productName}</strong>: ₹${data.price} | Offer: ${data.offerName}</p>`;
  });
};

window.viewFloorDetails = async function () {
  const floorNum = document.getElementById("floorNumber").value;
  const resultDiv = document.getElementById("floorResult");
  resultDiv.innerHTML = "";

  const q = query(collection(db, "shops"), where("floor", "==", floorNum));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    resultDiv.innerHTML = "<p>No shops found on this floor.</p>";
    return;
  }

  snapshot.forEach(doc => {
    const data = doc.data();
    resultDiv.innerHTML += `
    <div style="border: white solid 1px; padding: 5px 10px; border-radius: 5px">
    <p>${data.brand} | Category: ${data.category}</p>
    </div>
    <br>
    `;
  });
};
